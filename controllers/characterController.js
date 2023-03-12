// controllers/characterController.js

const Character = require('../api/character');
const User = require('../api/user');
const { handleSuccess, handleError, successResponse, errorResponse} = require('../utils/responseUtil');

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
        const { email } = req.query;


        const userInfo = await User.findByEmail(email)

        try {

            if (!userInfo || userInfo.length === 0){
                errorResponse(res, "User not found");
                return
            }


            const character = await Character.create({
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
                creatorId: userInfo[0].id
            });

            successResponse(res, character);
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async getAll(req, res) {
        try {
            const characters = await Character.findAll();
            successResponse(res, { list: [...characters[0]]});
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async getById(req, res) {
        const { id } = req.params;

        try {
            const character = await Character.findById(id);
            successResponse(res, { item: character[0]});
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
