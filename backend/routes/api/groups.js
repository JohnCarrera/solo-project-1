const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const {
    Group
    , GroupImage
    , User
    , Venue
    , Membership
    , Event
    , Attendance
    , EventImage
} = require('../../db/models');

const router = express.Router();

const validateGroupBody = [
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ min: 0, max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 60, max: 500 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['In person', 'Online'])
        .withMessage("Type must be 'Online' or 'In Person'"),
    check('private')
        .exists({ checkFalsy: true })
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required'),
    handleValidationErrors
];

//TODO: FIX VALIDATORS FOR THIS ROUTE => NOT PART OF SPEC
const validateVenueBody = [
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

//TODO: FIX VALIDATORS FOR THIS ROUTE => NOT PART OF SPEC
const validateEventBody = [
    check('venueId')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Venue does not exist'),
    check('name')
        .notEmpty()
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 100 })
        .withMessage('Name must be at least 5 characters'),
    check('type')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('capacity')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('price')
        .notEmpty()
        .withMessage('Longitude is not valid'),
    check('description')
        .notEmpty()
        .withMessage('Longitude is not valid'),
    check('startDate')
        .notEmpty()
        .withMessage('Longitude is not valid'),
    check('endDate')
        .notEmpty()
        .withMessage('End date is less than start date'),
    handleValidationErrors
];


router.get('/:groupId/members', requireAuth, async (req, res, next) => {

    let { groupId } = req.params;
    groupId = Number(groupId);

    let groupById = await Group.findByPk(groupId);

    if (!groupById) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let groupMembers = await User.scope('userMembership').findAll({
        include:[
            {
                model: Membership.scope('userMembership'),
                as: 'Membership',
                where: {
                    groupId: groupId
                }
            }
        ],
        raw: true,
    });

    console.log(groupMembers);

    let { organizerId } = groupById.dataValues;
    let { user } = req;

    if (!(organizerId === user.id)){
        const err = new Error("Forbidden")
        err.status = 403;
        err.title = 'Forbidden';
        return next(err);
    } else if (false){}


    // format response by moving the status kvp from the array in membership to the
    // top level of 'membership' as a kvp within the membership object per spec

    for( let x = 0; x < groupMembers.length; x++){
        groupMembers[x].Membership =  { status: groupMembers[x]['Membership.status'] };
        groupMembers[x]['Membership.status'] = undefined;
    }


    res.json({ Members: groupMembers });
});

router.get('/:groupId/venues', requireAuth, async (req, res) => {   //auth required: true

    let allVenues = await Venue.findAll({
        where: {
            groupId: req.params.groupId
        }
    });

    res.json({ Venues: allVenues });
});

router.get('/:groupId/events', async (req, res, next) => {

    let groupById = await Group.findByPk(Number(req.params.groupId));

    if (!groupById) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let allEvents = await Event.findAll({
        where: {
            groupId: Number(req.params.groupId)
        },
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

router.post(
    '/:groupId/events'
    , requireAuth
    , validateEventBody
    , async (req, res, next) => {

    const {
        venueId
        , name
        , type
        , capacity
        , price
        , description
        , startDate
        , endDate
    } = req.body;

    let { groupId } = req.params;
    groupId = Number(groupId);


    let groupById = await Group.findByPk(groupId);

    if (!groupById) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let newEvent = await Event.create({
        groupId: groupId
        , venueId
        , name
        , type
        , capacity
        , price
        , description
        , startDate
        , endDate
    });

    res.json(newEvent);

})

router.post('/:groupId/venues', requireAuth, validateVenueBody, async (req, res, next) => {   //auth required: true

    const { address, city, state, lat, lng } = req.body;

    let groupById = await Group.findByPk(req.params.groupId);

    if (!groupById) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let newVenue = await Venue.create({
        groupId: Number(req.params.groupId)
        , address
        , city
        , state
        , lat
        , lng
    });

    let venueRes = {};

    venueRes.id = newVenue.dataValues.id;
    venueRes.groupId = newVenue.dataValues.id;
    venueRes.address = newVenue.dataValues.address;
    venueRes.city = newVenue.dataValues.city;
    venueRes.state = newVenue.dataValues.state;
    venueRes.lat = newVenue.dataValues.lat;
    venueRes.lng = newVenue.dataValues.lng;


    res.json(venueRes);
});



router.post('/:groupId/images', requireAuth, async (req, res, next) => {

    const { url, preview } = req.body;

    let groupById = await Group.findAll({
        where: {
            id: Number(req.params.groupId)
        }
    });

    if (!groupById.length) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let newGroupImage = await GroupImage.create({
        groupId: Number(req.params.groupId)
        , url
        , preview
    });

    console.log(newGroupImage);

    // actual newGroupImage obj contains groupId from the groupImages table
    // for whatever reason that has been excluded from the readme example res
    // so I removed it by creating a new object and transferring over just the
    // needed values

    res.json({
        id: newGroupImage.dataValues.id
        , url: newGroupImage.dataValues.url
        , preview: newGroupImage.dataValues.preview
    })

});

// this route works, and is made easier by excluding all the columns from the
// join table with the blank attributes array, but in the resulting join table there
// is still a rogue 'UserId' column that is coming from somewhere. I am not able to find it.

//get groups owned or joined by current user
router.get('/current', requireAuth, async (req, res, next) => {  //auth required: true

    let userOwnedGroups = await Group.findAll({
        where: {
            organizerId: req.user.id
        }
    });

    let userMemberGroups = await Group.findAll({
        where: {
        },
        include: {
            attributes: [],
            model: Membership,
            as: 'groupMemberIds',
            where: {
                userId: req.user.id
            }
        }
    });

    const allGroups = userOwnedGroups.concat(userMemberGroups)

    //lazy load members
    for (let x = 0; x < allGroups.length; x++) {
        let numMembers = await Membership.count({
            where: {
                groupId: allGroups[x].dataValues.id
            }
        });

        //lazy load preview image
        let previewImage = await GroupImage.findAll({
            where: {
                groupId: allGroups[x].dataValues.id,
                preview: true
            }
        });

        //append kvps to result for member count and image url
        allGroups[x].dataValues.numMembers = numMembers;
        allGroups[x].dataValues.previewImage = previewImage[0].url;
    }
    res.json({ Groups: allGroups });
});

//get group by id
router.get('/:groupId', async (req, res, next) => {  //auth required: false

    let groupById = await Group.findAll({
        where: {
            id: Number(req.params.groupId)
        },
        include: [
            { model: GroupImage },
            {
                model: User.scope('organizer'),
                as: 'Organizer',
            },
            { model: Venue }
        ],
    });

    if (!groupById.length) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    //lazy load members
    for (let x = 0; x < groupById.length; x++) {
        let numMembers = await Membership.count({
            where: {
                groupId: groupById[x].dataValues.id
            }
        });

        //append kvps to result for member count and image url
        groupById[x].dataValues.numMembers = numMembers;
    }
    res.json(groupById);
});

//edit a group
router.put('/:groupId', requireAuth, validateGroupBody, async (req, res, next) => {

    const { name, about, type, private, city, state } = req.body;

    let groupById = await Group.findByPk(req.params.groupId);

    if (!groupById) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let editedGroup = await groupById.update({
        name
        , about
        , type
        , private
        , city
        , state
    });

    res.json(editedGroup);
});


router.delete('/:groupId', requireAuth, async (req, res, next) => {

    let groupById = await Group.findByPk(req.params.groupId);

    if (!groupById) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    await groupById.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});


//get all groups
router.get('/', async (req, res) => {   //auth required: false

    let allGroups = await Group.findAll();

    //lazy load members
    for (let x = 0; x < allGroups.length; x++) {
        let numMembers = await Membership.count({
            where: {
                groupId: allGroups[x].dataValues.id
            }
        });

        //lazy load preview image
        let previewImage = await GroupImage.findAll({
            where: {
                groupId: allGroups[x].dataValues.id,
                preview: true
            }
        });

        //append kvps to result for member count and image url
        allGroups[x].dataValues.numMembers = numMembers;

        if (previewImage.length) {
            allGroups[x].dataValues.previewImage = previewImage[0].url;
        } else {
            allGroups[x].dataValues.previewImage = null;
        }
    }
    res.json(allGroups);
});

// create a group
router.post('/', requireAuth, validateGroupBody, async (req, res, next) => {

    const { name, about, type, private, city, state } = req.body;

    let newGroup = await Group.create({
        organizerId: req.user.id
        , name
        , about
        , type
        , private
        , city
        , state
    });

    res.json(newGroup);
});

module.exports = router;
