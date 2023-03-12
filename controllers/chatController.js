const { validationResult } = require('express-validator');
const ChatService = require('../services/chatService');
const ResponseUtil = require('../utils/responseUtil');
const { BadRequestError } = require('../utils/errorUtil');

const ChatController = {
    async getAllChats(req, res, next) {
        try {
            const userId = req.body;
            const chats = await ChatService.getAllChats(userId);
            ResponseUtil.successResponse(res, {list :[chats]});
        } catch (error) {
            next(error);
        }
    },

    async getChatById(req, res, next) {
        try {
            const { chatId, userId } = req.body;
            const chat = await ChatService.getChatById(chatId, userId);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    },

    async createChat(req, res, next) {
        try {
            const { name, characterIds, userId } = req.body;
            const chat = await ChatService.createChat(name, userId, characterIds);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    },

    async deleleChat(req, res, next) {

        try {
            const { chatId } = req.params;
            await ChatService.deleteChat(chatId);
            ResponseUtil.successResponse(res);
        } catch (error) {
            next(error);
        }

    },

    async createChatItem(req, res, next) {
        try {
            const { chatId } = req.params;
            const { characterId, content, type } = req.body;
            const chatItem = await ChatService.createChatItem(chatId, characterId, type, content);
            ResponseUtil.successResponse(res, chatItem);
        } catch (error) {
            next(error);
        }
    },

    async updateChatItem(req, res, next) {
        try {
            const { chatItemId } = req.params;
            const { content } = req.body;
            const chatItem = await ChatService.updateChatItem(chatItemId, content);
            ResponseUtil.successResponse(res, chatItem);
        } catch (error) {
            next(error);
        }
    },

    async getChatItems(req, res, next) {
        try {
            const { chatId } = req.params;
            const chatItems = await ChatService.getChatItems(chatId);
            ResponseUtil.successResponse(res, { list: [chatItems]});
        } catch (error) {
            next(error);
        }
    },

    async deleteChatItem(req, res, next) {
        try {
            const { chatItemId } = req.body;
            await ChatService.deleteChatItem(chatItemId);
            ResponseUtil.successResponse(res);
        } catch (error) {
            next(error);
        }
    },

    async updateChat(req, res, next) {
        try {
            const { chatId } = req.params;
            const { name, userId } = req.body;
            const chat = await ChatService.updateChat(chatId, name, userId);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    },

    async addParticipant(req, res, next) {
        try {
            const { characterId, chatId, userId } = req.body;
            const chat = await ChatService.addParticipant(chatId, userId, characterId);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    },

    async removeParticipant(req, res, next) {
        try {
            const { characterId, chatId, userId } = req.body;
            const chat = await ChatService.removeParticipant(chatId, userId, characterId);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ChatController;
