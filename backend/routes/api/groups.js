const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Group, GroupImage, User, Venue, Membership } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

const validateBody = [
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


router.get('/current', requireAuth, async (req, res, next) => {  //auth required: true

  // const { user } = req;
  // // check if there is a logged in user, if not throw auth error to error
  // // handling middleware per spec
  // if (!user) {
  //   const err = new Error('Authentication required')
  //   err.status = 401;
  //   err.title = ('Authentication required')
  //   return next(err);
  // }

  let userGroups = await User.findAll({
    where: {
      id: req.user.id
    },
    include: [
      {
        model: Group,
        include: [
          {
            model: GroupImage
          }
        ]
      }
    ]
  });

  res.json(userGroups);

})

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

  console.log(groupById);
  if (!groupById.length) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    err.title = 'Not found'
    return next(err);
  }

  //lazy load members
  for(let x = 0; x < groupById.length; x++){
    let numMembers = await Membership.count({
      where:{
        groupId: groupById[x].dataValues.id
      }
    });

   //append kvps to result for member count and image url
    groupById[x].dataValues.numMembers = numMembers;
  }
  res.json(groupById);
});


//get all groups
router.get('/', async (req, res) => {   //auth required: false
  let allGroups = await Group.findAll();

  //lazy load members
  for(let x = 0; x < allGroups.length; x++){
    let numMembers = await Membership.count({
      where:{
        groupId: allGroups[x].dataValues.id
      }
    });

  //lazy load preview image
   let previewImage = await GroupImage.findAll({
    where:{
      groupId: allGroups[x].dataValues.id,
      preview: true
    }
   });

   //append kvps to result for member count and image url
    allGroups[x].dataValues.numMembers = numMembers;
    allGroups[x].dataValues.previewImage = previewImage[0].url;
  }
  res.json(allGroups);
});





module.exports = router;
