const { validationResult } = require('express-validator');
const ChatService = require('../services/chatService');
const ResponseUtil = require('../utils/responseUtil');
const { BadRequestError } = require('../utils/errorUtil');

const ChatController = {
    async getAllChats(req, res, next) {
        try {
            const userId = req.user.id;
            const chats = await ChatService.getAllChats(userId);
            ResponseUtil.successResponse(res, chats);
        } catch (error) {
            next(error);
        }
    },

    async getChatById(req, res, next) {
        try {
            const chatId = req.params.id;
            const userId = req.user.id;
            const chat = await ChatService.getChatById(chatId, userId);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    },

    async createChat(req, res, next) {
        try {
            const userId = req.user.id;
            const { name, characterIds } = req.body;
            const chat = await ChatService.createChat(name, userId, characterIds);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    },

    async updateChat(req, res, next) {
        try {
            const chatId = req.params.id;
            const userId = req.user.id;
            const { name } = req.body;
            const chat = await ChatService.updateChat(chatId, name, userId);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    },

    async deleteChat(req, res, next) {
        try {
            const chatId = req.params.id;
            const userId = req.user.id;
            await ChatService.deleteChat(chatId, userId);
            ResponseUtil.successResponse(res);
        } catch (error) {
            next(error);
        }
    },

    async addParticipant(req, res, next) {
        try {
            const chatId = req.params.id;
            const userId = req.user.id;
            const { characterId } = req.body;
            const chat = await ChatService.addParticipant(chatId, userId, characterId);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    },

    async removeParticipant(req, res, next) {
        try {
            const chatId = req.params.id;
            const userId = req.user.id;
            const { characterId } = req.body;
            const chat = await ChatService.removeParticipant(chatId, userId, characterId);
            ResponseUtil.successResponse(res, chat);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ChatController;
