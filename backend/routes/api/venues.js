const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Venue } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

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


router.put('/:venueId', requireAuth, validateVenueBody, async (req, res, next) => {   //auth required: true

  const { address, city, state, lat, lng } = req.body;

  let venueById = await Venue.findByPk(req.params.venueId);

  if (!venueById) {
    const err = new Error("Venue couldn't be found");
    err.status = 404;
    err.title = 'Not found'
    return next(err);
  }

  let newVenue = await venueById.update({
    groupId: venueById.dataValues.groupId
    , address
    , city
    , state
    , lat
    , lng
  });

  delete newVenue.dataValues.createdAt
  delete newVenue.dataValues.updatedAt

  res.json(newVenue);
});


module.exports = router;
