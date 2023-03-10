// controllers/userController.js

const User = require('../models/user');
const { handleSuccess, handleError } = require('../utils/responseUtil');
const { validateRegisterInput } = require('../utils/validationUtil');

const UserController = {
    async register(req, res) {
        const { email, password } = req.body;

        try {
            validateRegisterInput(req.body);
            const user = await User.create(email, password);
            handleSuccess(res, user);
        } catch (err) {
            handleError(res, err);
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.authenticate(email, password);
            handleSuccess(res, user);
        } catch (err) {
            handleError(res, err);
        }
    },

    async getProfile(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findById(id);
            handleSuccess(res, user);
        } catch (err) {
            handleError(res, err);
        }
    },

    async logOut(req, res) {
        try {
            //const user = await User.logOut(req.userData.userId);
            handleSuccess(res, user);
        } catch (err) {
            handleError(res, err);
        }
    }
};

module.exports = UserController;
