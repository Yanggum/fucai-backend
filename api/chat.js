const database = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Chat = {
    async findById(id) {
        try {
            const chats = await database.select('*').from('chats').where({ id });

            if (chats.length === 0) {
                return null;
            }

            return chats[0];
        } catch {
            return null;
        }
    },

    async findAllByUserId(params) {
        try {
            return await database.select('*').from('chats').where('creator_id', '=', params.userId);
        } catch {
            return [];
        }
    },

    async create(name, id) {
        try {
            return await database.insert({
                id: uuidv4(),
                name,
                creator_id: id,
            }).into('chats');
        } catch {
            return null;
        }
    },

    async update(id, name) {
        try {
            return await database('chats').where({
                id
            }).update({
                name
            });
        } catch {
            return null;
        }
    },

    async delete(id) {
        try {
            return await database('chats').where({ id }).del();
        } catch {
            return null;
        }
    },

    async createChatItem(chatId, creatorId, type, content) {
        try {
            return await database.insert({
                chat_id: chatId,
                creator_id: creatorId,
                type,
                content,
            }).into('chat_item');
        } catch {
            return null;
        }
    },

    async getChatItems(chatId) {
        try {
            return await database.select('*').from('chat_item').where('chat_id', '=', chatId).orderBy('created_at', 'asc');
        } catch {
            return [];
        }
    },

    async modifyChatItem(chatId, content) {
        try {
            return await database('chat_item').where({
                id: chatId,
            }).update({
                content,
            });
        } catch {
            return null;
        }
    },

    async deleteChatItem(id) {
        try {
            return await database('chat_item').where({ id }).del();
        } catch {
            return null;
        }
    }


};

module.exports = Chat;
