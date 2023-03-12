const connector = require('../config/connector');

const Character = {
    async findAll() {
        try {
            const characters = await connector.mybatisQuery("characters.selectAll", {});

            const data = {
                token,
            }

            return characters;
        } catch {
            return null;
        }
    },

    async findById(id) {
        try {
            const characters = await connector.mybatisQuery("characters.selectById", { id });

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
            const character = {
                name,
                description,
                creatorId,
                visibility,
                isContentious,
                slug
            };
            return await connector.mybatisQuery("characters.insert", character);
        } catch {
            return null;
        }
    },

    async update(id, name, description, visibility, isContentious) {
        try {
            const updatedCharacter = {
                name,
                description,
                visibility,
                isContentious,
                id
            };
            return await connector.mybatisQuery("characters.update", updatedCharacter);
        } catch {
            return null;
        }
    },

    async delete(id) {
        try {
            return await connector.mybatisQuery("characters.delete", { id });
        } catch {
            return null;
        }
    },

};

module.exports = Character;

