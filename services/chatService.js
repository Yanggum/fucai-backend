// services/chatService.js

const Chat = require('../api/chat');
const Character = require('../api/character');
const ChatParticipant = require('../api/chatParticipant');
const { NotFoundError, UnauthorizedError } = require('../utils/errorUtil');

const ChatService = {
    async getAllChats(userId) {
        return await Chat.findAllByUserId(userId);
    },

    async getChatById(id, userId) {
        const chat = await Chat.findById(id);
        if (!chat) {
            throw new NotFoundError(`Chat with ID ${id} not found`);
        }
        const isParticipant = await ChatParticipant.isParticipant(id, userId);
        if (!isParticipant) {
            throw new UnauthorizedError(`Not authorized to view chat with ID ${id}`);
        }
        chat.participants = await ChatParticipant.findByChatId(id);
        return chat;
    },

    async createChat(name, creatorId, characterIds) {
        const chat = await Chat.create(name, creatorId);
        const chatId = chat.id;
        const promises = characterIds.map(async (characterId) => {
            const character = await Character.findById(characterId);
            if (!character) {
                throw new NotFoundError(`Character with ID ${characterId} not found`);
            }
            await ChatParticipant.create(chatId, characterId);
        });
        await Promise.all(promises);
        return chat;
    },

    async createChatItem(chatId, creatorId, type, text) {
        return await Chat.createChatItem(chatId, creatorId, type, text);
    },

    async updateChatItem(chatItemId, text) {
        return await Chat.modifyChatItem(chatItemId, text);
    },

    async getChatItems(chatId) {
        return await Chat.getChatItems(chatId);
    },

    async updateChat(id, name, userId) {
        const chat = await Chat.findById(id);
        if (!chat) {
            throw new NotFoundError(`Chat with ID ${id} not found`);
        }
        if (chat.creator_id !== parseInt(userId)) {
            throw new UnauthorizedError(`Not authorized to update chat with ID ${id}`);
        }
        return await Chat.update(id, name);
    },

    async deleteChat(id) {
        await ChatParticipant.deleteByChatId(id);
        await Chat.delete(id);
    },

    async deleteChatItem(chatItemId) {
        return await Chat.deleteChatItem(chatItemId);
    },

    async addParticipant(chatId, characterId) {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw new NotFoundError(`Chat with ID ${chatId} not found`);
        }
        const character = await Character.findById(characterId);
        if (!character) {
            throw new NotFoundError(`Character with ID ${characterId} not found`);
        }
        await ChatParticipant.create(chatId, characterId);
    },

    async removeParticipant(chatId, characterId) {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw new NotFoundError(`Chat with ID ${chatId} not found`);
        }
        const character = await Character.findById(characterId);
        if (!character) {
            throw new NotFoundError(`Character with ID ${characterId} not found`);
        }
        await ChatParticipant.delete(chatId, characterId);
    }
};

module.exports = ChatService;
