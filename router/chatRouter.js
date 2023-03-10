// chatRouter.js

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', chatController.getAllChats);

router.get('/:chatId', chatController.getChatById);

router.post('/', authMiddleware, chatController.createChat);

router.patch('/:chatId', authMiddleware, chatController.updateChat)

router.delete('/:chatId', authMiddleware, chatController.deleteChat);

module.exports = router;
