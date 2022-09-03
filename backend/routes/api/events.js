const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Group, EventImage, User, Venue, Event, Attendance } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

//TODO: FIX VALIDATORS FOR THIS ROUTE => NOT PART OF SPEC
const validateEventBody = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .notEmpty()
        .withMessage('Longitude is not valid'),
    handleValidationErrors
];


router.post('/:eventId/images', requireAuth, async (req, res, next) => {

    const { url, preview } = req.body;

    let eventById = await Event.findAll({
        where: {
            id: Number(req.params.eventId)
        }
    });

    if (!eventById.length) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let newEventImage = await EventImage.create({
        groupId: Number(req.params.eventId)
        , url
        , preview
    });

    // actual newEventImage obj contains eventId from the eventImages table
    // for whatever reason that has been excluded from the readme example res
    // so I removed it by creating a new object and transferring over just the
    // needed values

    res.json({
        id: newEventImage.dataValues.id
        , url: newEventImage.dataValues.url
        , preview: newEventImage.dataValues.preview
    });

});

router.get('/:eventId', async (req, res, next) => {

    let { eventId } = req.params;
    let eventById = await Event.findByPk(Number(eventId), {
        include: [
            {
                model: Group.scope('eventIdRoute')
            },
            {
                model: Venue.scope('eventIdRoute')
            },
            {
                model: EventImage.scope('eventRoute')
            }

        ]
    });

    if (!eventById) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    //lazy load attendees

    let numAttending = await Attendance.count({
        where: {
            eventId: eventId
        }
    });

    //lazy load preview image
    let previewImage = await EventImage.findAll({
        where: {
            eventId: eventId,
            preview: true
        }
    });

    //append kvps to result for member count and image url
    eventById.dataValues.numAttending = numAttending;

    if (previewImage.length) {
        eventById.dataValues.previewImage = previewImage[0].url;
    } else {
        eventById.dataValues.previewImage = null;
    }


    res.json(eventById);
});

router.get('/', async (req, res, next) => {

    let allEvents = await Event.findAll({
        include: [
            {
                model: Group.scope('eventRoute')
            },
            {
                model: Venue.scope('eventRoute')
            }
        ]
    });

    //lazy load attendees
    for (let x = 0; x < allEvents.length; x++) {
        let numAttending = await Attendance.count({
            where: {
                eventId: allEvents[x].dataValues.id
            }
        });

        //lazy load preview image
        let previewImage = await EventImage.findAll({
            where: {
                eventId: allEvents[x].dataValues.id,
                preview: true
            }
        });

        //append kvps to result for member count and image url
        allEvents[x].dataValues.numAttending = numAttending;

        if (previewImage.length) {
            allEvents[x].dataValues.previewImage = previewImage[0].url;
        } else {
            allEvents[x].dataValues.previewImage = null;
        }
    }

    res.json({ Events: allEvents });
});




module.exports = router;
