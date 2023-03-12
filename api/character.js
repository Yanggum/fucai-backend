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

    async create(characterProps) {
        try {
            const character = {
                name,
                description,
                creator_id,
                visibility,
                is_contentious,
                slug,
                avatar_id,
                greeting,
                persona,
                world_scenario,
                example_chats
            } = characterProps;
            return await database.insert(character).into('characters');
        } catch {
            return null;
        }
    },

    async update(id, name, description, slug, avatar_id, greeting, persona, world_scenario, example_chats, visibility, is_contentious) {
        try {
            return await database('characters').where({ id }).update({
                name,
                description,
                visibility,
                is_contentious,
                id,
                slug,
                avatar_id,
                greeting,
                persona,
                world_scenario,
                example_chats
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

