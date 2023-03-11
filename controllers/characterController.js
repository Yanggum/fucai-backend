// controllers/characterController.js

const Character = require('../api/character');
const { handleSuccess, handleError } = require('../utils/responseUtil');

const CharacterController = {
    async create(req, res) {
        const {
            slug,
            name,
            description,
            avatarId,
            greeting,
            persona,
            worldScenario,
            exampleChats,
            visibility,
            isContentious,
        } = req.body;
        const { userId } = req.session;

        try {
            const character = await Character.create(
                userId,
                slug,
                name,
                description,
                avatarId,
                greeting,
                persona,
                worldScenario,
                exampleChats,
                visibility,
                isContentious
            );
            handleSuccess(res, character);
        } catch (err) {
            handleError(res, err);
        }
    },

    async getAll(req, res) {
        try {
            const characters = await Character.findAll();
            handleSuccess(res, characters);
        } catch (err) {
            handleError(res, err);
        }
    },

    async getById(req, res) {
        const { id } = req.params;

        try {
            const character = await Character.findById(id);
            handleSuccess(res, character);
        } catch (err) {
            handleError(res, err);
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const {
            slug,
            name,
            description,
            avatarId,
            greeting,
            persona,
            worldScenario,
            exampleChats,
            visibility,
            isContentious,
        } = req.body;

        try {
            const updatedCharacter = await Character.update(
                id,
                slug,
                name,
                description,
                avatarId,
                greeting,
                persona,
                worldScenario,
                exampleChats,
                visibility,
                isContentious
            );
            handleSuccess(res, updatedCharacter);
        } catch (err) {
            handleError(res, err);
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            await Character.delete(id);
            handleSuccess(res, {});
        } catch (err) {
            handleError(res, err);
        }
    },
};

module.exports = CharacterController;
