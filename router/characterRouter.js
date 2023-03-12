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
            body('is_contentious').isBoolean(),
    ],
    validationMiddleware,
    characterController.create
);

router.get('/', characterController.getAll);

router.get('/:id', characterController.getById);

router.patch(
    '/:id',
    [
            authMiddleware,
            body('name').not().isEmpty(),
            body('description').not().isEmpty(),
            body('visibility').isIn(['public', 'private']),
            body('is_contentious').isBoolean(),
    ],
    validationMiddleware,
    characterController.update
);

router.delete('/:id', authMiddleware, characterController.delete);

module.exports = router;
