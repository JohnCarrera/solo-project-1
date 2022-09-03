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


router.get('/', async (req, res, next) => {

  let allEvents = await Event.findAll({
    include:[
      {
        model: Group.scope('eventRoute')
      },
      {
        model: Venue.scope('eventRoute')
      }
    ]
  });

  //lazy load attendees
  for(let x = 0; x < allEvents.length; x++){
    let numAttending = await Attendance.count({
      where:{
        eventId: allEvents[x].dataValues.id
      }
    });

   //lazy load preview image
   let previewImage = await EventImage.findAll({
    where:{
      eventId: allEvents[x].dataValues.id,
      preview: true
    }
   });

   //append kvps to result for member count and image url
    allEvents[x].dataValues.numAttending = numAttending;

    if(previewImage.length){
    allEvents[x].dataValues.previewImage = previewImage[0].url;
    } else {
      allEvents[x].dataValues.previewImage = null;
    }
  }

  res.json({Events: allEvents});
});




module.exports = router;
