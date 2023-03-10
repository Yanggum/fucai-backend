const mybatisMapper = require('../config/mapper');

const ChatParticipant = {
    async findByChatId(chatId) {
        const result = await mybatisMapper.get('ChatParticipant', 'findByChatId', { chatId });
        return result;
    },

    async findByChatIdAndCharacterId(chatId, characterId) {
        const result = await mybatisMapper.get('ChatParticipant', 'findByChatIdAndCharacterId', { chatId, characterId });
        return result;
    },

    async create(chatId, characterId) {
        await mybatisMapper.run('ChatParticipant', 'create', { chatId, characterId });
    },

    async deleteByChatId(chatId) {
        await mybatisMapper.run('ChatParticipant', 'deleteByChatId', { chatId });
    },

    async deleteByChatIdAndCharacterId(chatId, characterId) {
        await mybatisMapper.run('ChatParticipant', 'deleteByChatIdAndCharacterId', { chatId, characterId });
    },
};

module.exports = ChatParticipant;
