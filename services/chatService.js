// services/chatService.js

const Chat = require('../api/chat');
const Character = require('../api/character');
const ChatParticipant = require('../api/chatParticipant');
const { NotFoundError, UnauthorizedError } = require('../utils/errorUtil');

const ChatService = {
    async getAllChats(userId) {
        const chats = await Chat.findAll(userId);
        return chats;
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
        const chatParticipants = await ChatParticipant.findByChatId(id);
        chat.participants = chatParticipants;
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

    async updateChat(id, name, userId) {
        const chat = await Chat.findById(id);
        if (!chat) {
            throw new NotFoundError(`Chat with ID ${id} not found`);
        }
        if (chat.creatorId !== userId) {
            throw new UnauthorizedError(`Not authorized to update chat with ID ${id}`);
        }
        const updatedChat = await Chat.update(id, name);
        return updatedChat;
    },

    async deleteChat(id, userId) {
        const chat = await Chat.findById(id);
        if (!chat) {
            throw new NotFoundError(`Chat with ID ${id} not found`);
        }
        if (chat.creatorId !== userId) {
            throw new UnauthorizedError(`Not authorized to delete chat with ID ${id}`);
        }
        await ChatParticipant.deleteByChatId(id);
        await Chat.delete(id);
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
