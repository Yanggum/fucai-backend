// services/characterService.js

const Character = require('../api/character');
const { NotFoundError, UnauthorizedError } = require('../utils/errorUtil');

const CharacterService = {
    async getAllCharacters() {
        const characters = await Character.findAll();
        return characters;
    },

    async getCharacterById(id) {
        const character = await Character.findById(id);
        if (!character) {
            throw new NotFoundError(`Character with ID ${id} not found`);
        }
        return character;
    },

    async createCharacter(name, description, avatar_id, greeting, persona, worldScenario, exampleChats, visibility, is_contentious, creatorId) {
        const character = await Character.create(name, description, avatar_id, greeting, persona, worldScenario, exampleChats, visibility, is_contentious, creatorId);
        return character;
    },

    async updateCharacter(id, name, description, avatar_id, greeting, persona, worldScenario, exampleChats, visibility, is_contentious, creatorId) {
        const character = await Character.findById(id);
        if (!character) {
            throw new NotFoundError(`Character with ID ${id} not found`);
        }
        if (character.creatorId !== creatorId) {
            throw new UnauthorizedError(`Not authorized to update character with ID ${id}`);
        }
        const updatedCharacter = await Character.update(id, name, description, avatar_id, greeting, persona, worldScenario, exampleChats, visibility, is_contentious);
        return updatedCharacter;
    },

    async deleteCharacter(id, creatorId) {
        const character = await Character.findById(id);
        if (!character) {
            throw new NotFoundError(`Character with ID ${id} not found`);
        }
        if (character.creatorId !== creatorId) {
            throw new UnauthorizedError(`Not authorized to delete character with ID ${id}`);
        }
        await Character.delete(id);
    },
};

module.exports = CharacterService;
