const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
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

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    console.log(user);
    if (user) {
      currentUser = user.toSafeObject();
      return res.json(currentUser);
    } else return res.json({});
  }
);

router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      err.title = 'Invalid credentials';
      //err.errors = ['Invalid credentials'];
      return next(err);
    }

    const token = await setTokenCookie(res, user);
    const userRes = user.toSafeObject();
    userRes.token = token;
    return res.json(userRes);
  }
);

module.exports = router;
