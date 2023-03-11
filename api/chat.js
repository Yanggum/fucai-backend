const connector = require('../config/connector');
const { v4: uuidv4 } = require('uuid');

const Chat = {
    async findById(id) {
        try {
            const chats = await connector.mybatisQuery('chats.selectById', { id });

            if (chats.length === 0) {
                return null;
            }

            return chats[0];
        } catch {
            return null;
        }
    },

    async findAllByCharacterId(characterId) {
        try {
            return await connector.mybatisQuery('chats.selectAllByCharacterId', { characterId });
        } catch {
            return [];
        }
    },

    async create(name, characterId) {
        try {
            const chat = {
                id: uuidv4(),
                name,
                characterId,
            };
            return await connector.mybatisQuery('chats.insert', chat);
        } catch {
            return null;
        }
    },

    async update(id, name) {
        try {
            const updatedChat = {
                name,
                id,
            };
            return await connector.mybatisQuery('chats.update', updatedChat);
        } catch {
            return null;
        }
    },

    async delete(id) {
        try {
            return await connector.mybatisQuery('chats.delete', { id });
        } catch {
            return null;
        }
    },
};

module.exports = Chat;
