const database = require('../config/database');

const ChatParticipant = {
    async create(chatId, userId) {
        try {
            return await database.insert({
                chat_id: chatId,
                user_id: userId,
            }).into('chat_participants');
        } catch {
            return null;
        }
    },

    async findByChatId(chatId) {
        try {
            return await database.select('*').from('chat_participants').where({ chat_id: chatId });
        } catch (e) {
            return null;
        }
    },

    async findByChatIdAndUserId(chatId, userId) {
        try {
            const chatParticipants = await database.select('*').from('chat_participants').where({ chat_id: chatId, user_id: userId });
            if (chatParticipants.length === 0) {
                return null;
            }
            return chatParticipants[0];
        } catch (e) {
            return null;
        }
    },

    async isParticipant(chatId, userId) {
        try {
            const chatParticipants = await database.select('*').from('chat_participants').where({ chat_id: chatId, user_id: userId });
            if (chatParticipants.length === 0) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    },

    async delete(chatId, userId) {
        try {
            return await database('chat_participants').where({ chat_id: chatId, user_id: userId }).del();
        } catch {
            return null;
        }
    },

    async deleteByChatId(chatId) {
        try {
            return await database('chat_participants').where({ chat_id: chatId }).del();
        } catch {
            return null;
        }
    }
};

module.exports = ChatParticipant;
