const connector = require('../config/connector');

const Character = {
    async findAll() {
        try {
            return await connector.mybatisQuery("characters.selectAll", {});
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

    async create(characterProps
    ) {
        try {
            const character = {
                name,
                description,
                creatorId,
                visibility,
                isContentious,
                slug,
                avatarId,
                greeting,
                persona,
                worldScenario,
                exampleChats,
            } = characterProps;
            return await connector.mybatisQuery("characters.insert", {...character});
        } catch {
            return null;
        }
    },

    async update(id, name, description, slug, avatarId, greeting, persona, worldScenario, exampleChats, visibility, isContentious) {
        try {
            const updatedCharacter = {
                name,
                description,
                visibility,
                isContentious,
                id,
                slug,
                avatarId,
                greeting,
                persona,
                worldScenario,
                exampleChats
            };
            return await connector.mybatisQuery("characters.updateById", updatedCharacter);
        } catch {
            return null;
        }
    },

    async delete(id) {
        try {
            return await connector.mybatisQuery("characters.deleteById", { id });
        } catch {
            return null;
        }
    },

};

module.exports = Character;

