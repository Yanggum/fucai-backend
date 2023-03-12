// controllers/characterController.js

const Character = require('../api/character');
const { successResponse, errorResponse } = require('../utils/responseUtil');

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
            successResponse(res, character);
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async getAll(req, res) {
        try {
            const characters = await Character.findAll();
            successResponse(res, characters);
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async getById(req, res) {
        const { id } = req.params;

        try {
            const character = await Character.findById(id);
            successResponse(res, character);
        } catch (err) {
            errorResponse(res, err);
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
            successResponse(res, updatedCharacter);
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            await Character.delete(id);
            successResponse(res, {});
        } catch (err) {
            errorResponse(res, err);
        }
    },
};

module.exports = CharacterController;
