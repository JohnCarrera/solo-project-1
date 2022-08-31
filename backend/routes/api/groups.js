const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('credential')
    .exists({ checkFalsy: true })
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];


router.get('/:id', async (req, res) => {
  let groupById = await Group.findByPk(Number(req.params.id));
  res.json(groupById);
});

router.get('/', async (req, res) => {   // this route does not require authentication per spec
 let allGroups = await Group.findAll();
  res.json({Groups: allGroups});
});



module.exports = router;
