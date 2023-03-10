// authRouter.js

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const validationMiddleware = require('../middlewares/validationMiddleware');


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post(
    '/register',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    ],
    validationMiddleware,
    register
);

router.post(
    '/login',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ],
    validationMiddleware,
    login
);

module.exports = router;
