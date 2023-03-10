// models/chat.js

const { mapper } = require('../config/mapper');
const { NotFoundError } = require('../utils/errorUtil');

const Chat = {
    async findById(id) {
        const chat = await mapper.get('chat', 'selectById', { id });
        if (!chat) {
            throw new NotFoundError('Chat not found');
        }
        return chat;
    },

    async create(chat) {
        const result = await mapper.insert('chat', 'insert', chat);
        chat.id = result.generated_keys[0];
        return chat;
    },

    async update(chat) {
        const result = await mapper.update('chat', 'updateById', chat);
        if (result.affected_rows === 0) {
            throw new NotFoundError('Chat not found');
        }
        return chat;
    },

    async delete(id) {
        const result = await mapper.delete('chat', 'deleteById', { id });
        if (result.affected_rows === 0) {
            throw new NotFoundError('Chat not found');
        }
    },
};

module.exports = Chat;
