// characterRouter.js

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const characterController = require('../controllers/characterController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.post(
    '/',
    [
            authMiddleware,
            body('slug').isSlug(),
            body('name').not().isEmpty(),
            body('description').not().isEmpty(),
            body('visibility').isIn(['public', 'private']),
            body('isContentious').isBoolean(),
    ],
    validationMiddleware,
    characterController.create
);

router.get('/', characterController.getAll);

router.get('/:slug', characterController.getById);

router.patch(
    '/:slug',
    [
            authMiddleware,
            body('name').not().isEmpty(),
            body('description').not().isEmpty(),
            body('visibility').isIn(['public', 'private']),
            body('isContentious').isBoolean(),
    ],
    validationMiddleware,
    characterController.update
);

router.delete('/:slug', authMiddleware, characterController.delete);

module.exports = router;
