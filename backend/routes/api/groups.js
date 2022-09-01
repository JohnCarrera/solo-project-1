const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Group, GroupImage, User, Venue } = require('../../db/models');
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

router.get('/current', restoreUser, async (req, res, next) => {  //auth required: true

  const { user } = req;
  // check if there is a logged in user, if not throw auth error to error
  // handling middleware per spec
   if(!user){
    const err = new Error('Authentication required')
    err.status = 401;
    err.title = ('Authentication required')
    return next(err);
   }

   console.log('logged in user: ', user.id, user)

   let userGroups = await Group.findAll({
    where: {

      organizerId: user.id
      // [Op.or]: [
      //   {
      //     organizerId: user.id
      //   },
      //   {
      //     userId: user.id
      //   }
      // ]
    },
    // include: [
    //   {
    //     model: Group,
    //     where:{
    //       'organizerId': user.id
    //     }
    //   }
    // ]
   });

   res.json(userGroups);

})

router.get('/:groupId', async (req, res, next) => {  //auth required: false

  let groupById = await Group.findAll({
    where: {
      id: Number(req.params.groupId)
    },
    include: [
      {
        model: GroupImage
      },
      {
        model: User.scope('organizer'),
        as: 'Organizer',
      },
      {
        model: Venue
      }
    ]
  });

  if (!groupById.length){
    const err = new Error("Group couldn't be found");
    err.status = 404;
    err.title = 'Not found'
    return next(err);
  }

  res.json(groupById);
});

router.get('/', async (req, res) => {   //auth required: false
 let allGroups = await Group.findAll();
  res.json({Groups: allGroups});
});



module.exports = router;
