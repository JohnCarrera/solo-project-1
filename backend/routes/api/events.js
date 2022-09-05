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

router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {

    let { eventId } = req.params;
    eventId = Number(eventId);

    let userId  = req.body.memberId;

    let eventById = await Event.findAll({
        where: {
            id: eventId
        }
    });

    if (!eventById.length) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let foundAttendance = await Attendance.findAll({
        where: {
            eventId: eventId,
            userId: userId
        },
        attributes:['id', 'eventId', 'userId', 'status']
    });

    if (!foundAttendance.length) {
        const err = new Error("Attendance does not exist for this User");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }


    foundAttendance[0].destroy();

    res.json({message: 'Successfully deleted attendance from event'});

});

router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {

    let { eventId } = req.params;
    eventId = Number(eventId);

    let { userId, status } = req.body;


    let eventById = await Event.findAll({
        where: {
            id: eventId
        }
    });

    if (!eventById.length) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    if (status === 'pending'){
        const err = new Error("Cannot change an attendance status to pending");
        err.status = 400;
        err.title = 'Denied'
        return next(err);
    }

    let foundAttendance = await Attendance.findAll({
        where: {
            eventId: eventId,
            userId: userId
        },
        attributes:['id', 'eventId', 'userId', 'status']
    });

    if (!foundAttendance.length) {
        const err = new Error("Attendance between the user and the event does not exist");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let updatedAtten = await foundAttendance[0].update({
        eventId: eventId,
        userId: userId,
        status: status
    });


    let resObj = {};

    resObj.id = foundAttendance[0].id;
    resObj.eventId = updatedAtten.dataValues.eventId;
    resObj.userId = updatedAtten.dataValues.userId;
    resObj.status = updatedAtten.dataValues.status;

    res.json(resObj);
});

router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {

    let eventId = Number(req.params.eventId);

    let eventById = await Event.findAll({
        where: {
            id: eventId
        }
    });

    if (!eventById.length) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    const attendeeCheck = await Attendance.findAll({
        where:{
            userId: req.user.id,
            eventId: eventId
        }
    });

    if (attendeeCheck.length){

        const attendeeStatus = attendeeCheck[0].dataValues.status;

        if ( attendeeStatus === 'pending'){
            const err = new Error("Attendance has already been requested");
            err.status = 404;
            err.title = 'Already requested'
            return next(err);
        }

        if (attendeeStatus === 'member'){
            const err = new Error("User is already an attendee of the event");
            err.status = 404;
            err.title = 'Already an Attendee'
            return next(err);
        }
    }

    let newAtten = await Attendance.create({
        eventId: eventId,
        userId: req.user.id,
        status: 'pending'
    });

    console.log(newAtten);


    res.json({
        eventId: newAtten.eventId,
        userId: newAtten.userId,
        status: newAtten.status
    });
});

router.get('/:eventId/attendees', async (req, res, next) => {

    let eventId = Number(req.params.eventId);

    let eventById = await Event.findAll({
        where: {
            id: eventId
        }
    });

    if (!eventById.length) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let eventAttendees = await User.scope('userAttendance').findAll({
        include:[
            {
                model: Event,
                where: {
                  id: eventId
                },
                attributes: []
            },
            {
                model: Attendance.scope('eventAttendees'),
                as: 'Attendance'
            }
        ],
        raw: true
    });

    // // format response by moving the status kvp from the array in membership to the
    // // top level of 'membership' as a kvp within the membership object per spec

    console.log(eventAttendees);

    let resObj = [];

    for(let x = 0; x < eventAttendees.length; x++) {

        let arrayObj = {};
        arrayObj.id = eventAttendees[x].id;
        arrayObj.firstName = eventAttendees[x].firstName;
        arrayObj.lastName = eventAttendees[x].lastName;
        arrayObj.Attendance = { status: eventAttendees[x]['Attendance.status']}

        resObj.push(arrayObj);
    }


    res.json({Attendees: resObj});
});

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
    eventId = Number(eventId);

    let eventById = await Event.findByPk(eventId, {
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

router.put('/:eventId', async (req, res, next) => {

    let { eventId } = req.params;
    eventId = Number(eventId);

    let {
        venueId
        , name
        , type
        , capacity
        , price
        , description
        , startDate
        , endDate
     } = req.body;

    let eventById = await Event.findByPk(eventId);
    let venueById = await Venue.findByPk(venueId);


    if (!eventById) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    if (!venueById) {
        const err = new Error("Venue couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let newEvent = await eventById.update({
        venueId
        , name
        , type
        , capacity
        , price
        , description
        , startDate
        , endDate
    });

    res.json(newEvent);
});

router.delete('/:eventId', async (req, res, next) => {

    let { eventId } = req.params;
    eventId = Number(eventId);

    let eventById = await Event.findByPk(eventId);
    console.log('event:', eventById );
    if (!eventById) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    eventById.destroy();

    res.json({ message: 'Successfully deleted'});
})

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
