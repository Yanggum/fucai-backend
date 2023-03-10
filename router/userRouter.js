// userRouter.js

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.post(
    '/signup',
    [
      body('email').isEmail(),
      body('password').isLength({ min: 6 }),
    ],
    validationMiddleware,
    userController.register
);

router.post('/login', userController.login);

router.post('/logout', authMiddleware, userController.logOut);

router.get('/', authMiddleware, userController.getProfile);

// router.patch(
//     '/',
//     [
//       authMiddleware,
//       body('email').isEmail(),
//       body('password').isLength({ min: 6 }),
//     ],
//     validationMiddleware,
//     updateUser
// );

module.exports = router;
