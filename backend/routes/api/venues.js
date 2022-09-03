const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Venue } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

const validateBody = [
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({min:0, max: 60})
    .withMessage('Name must be 60 characters or less'),
  check('about')
    .exists({ checkFalsy: true })
    .isLength({min: 60, max: 500})
    .withMessage('About must be 50 characters or more'),
  check('type')
    .exists({ checkFalsy: true })
    .isIn(['In person', 'Online'] )
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


router.put('/venues/:venueId', requireAuth, validateVenueBody, async (req, res, next) => {   //auth required: true

  const { address, city, state, lat, lng } = req.body;

  let venueById = await Venue.findByPk(req.params.venueId);

  if (!venueById) {
    const err = new Error("Venue couldn't be found");
    err.status = 404;
    err.title = 'Not found'
    return next(err);
  }

  let newVenue = await Venue.update({
    groupId: venueById.dataValues.groupId
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
