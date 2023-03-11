const connector = require('../config/connector');

const ChatParticipant = {
    async create(chatId, userId) {
        try {
            const chatParticipant = {
                chatId,
                userId
            };
            return await connector.mybatisQuery("chatParticipant.insert", chatParticipant);
        } catch {
            return null;
        }
    },

    async findByChatId(chatId) {
        try {
            const chatParticipants = await connector.mybatisQuery("chatParticipant.selectByChatId", { chatId });
            return chatParticipants;
        } catch (e) {
            return null;
        }
    },

    async findByChatIdAndUserId(chatId, userId) {
        try {
            const chatParticipants = await connector.mybatisQuery("chatParticipant.selectByChatIdAndUserId", { chatId, userId });
            if (chatParticipants.length === 0) {
                return null;
            }
            return chatParticipants[0];
        } catch (e) {
            return null;
        }
    },

    async delete(chatId, userId) {
        try {
            const chatParticipant = {
                chatId,
                userId
            };
            return await connector.mybatisQuery("chatParticipant.delete", chatParticipant);
        } catch {
            return null;
        }
    },
};

module.exports = ChatParticipant;
