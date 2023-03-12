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

    async findAllByCharacterId(id) {
        try {
            return await database.select('*').from('chats').where({ id });
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
                name,
                id,
            }).update();
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
};

module.exports = Chat;
