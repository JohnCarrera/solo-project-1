const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Group, GroupImage, User, Venue, Membership } = require('../../db/models');
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
    groupId: req.params.groupId
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
      attributes:[],
      model: Membership,
      as: 'groupMemberIds',
      where: {
        userId: req.user.id
      }
    }
  });

  const allGroups = userOwnedGroups.concat(userMemberGroups)

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
  res.json({Groups: allGroups});

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

//edit a group
router.put('/:groupId', requireAuth, validateBody, async (req, res, next) => {
 console.log('router.put/:groupId');
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


router.post('/', requireAuth, validateBody, async (req, res, next) => {

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
