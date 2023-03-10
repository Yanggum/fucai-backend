// models/character.js
const { mapper } = require('../config/mapper');
const { NotFoundError } = require('../utils/errorUtil');

const Character = {
    async findById(id) {
        const character = await mapper.get('character', 'selectById', { id });
        if (!character) {
            throw new NotFoundError('Character not found');
        }
        return character;
    },

    async create(character) {
        const result = await mapper.insert('character', 'insert', character);
        character.id = result.generated_keys[0];
        return character;
    },

    async update(character) {
        const result = await mapper.update('character', 'updateById', character);
        if (result.affected_rows === 0) {
            throw new NotFoundError('Character not found');
        }
        return character;
    },

    async delete(id) {
        const result = await mapper.delete('character', 'deleteById', { id });
        if (result.affected_rows === 0) {
            throw new NotFoundError('Character not found');
        }
    },
};

module.exports = Character;
