const database = require('../config/database');

const Character = {
    async findAll() {
        try {
            return await database.select('*').from('characters')
        } catch {
            return null;
        }
    },

    async findById(id) {
        try {
            const characters = await database.select('*').from('characters').where({ id });

            if (characters.length === 0) {
                return null;
            }

            return characters[0];
        } catch {
            return null;
        }
    },

    async create(name, description, creatorId, visibility, isContentious, slug) {
        try {
            return await database.insert({
                name,
                description,
                creator_id: creatorId,
                visibility,
                is_contentious: isContentious,
                slug
            }).into('characters');
        } catch {
            return null;
        }
    },

    async update(id, name, description, visibility, isContentious) {
        try {
            return await database('characters').where({ id }).update({
                name,
                description,
                visibility,
                is_contentious: isContentious,
                id
            });
        } catch {
            return null;
        }
    },

    async delete(id) {
        try {
            return await database('characters').where({ id }).del();
        } catch {
            return null;
        }
    },

};

module.exports = Character;

