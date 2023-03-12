// controllers/userController.js

const User = require('../api/user');
const { successResponse, errorResponse } = require('../utils/responseUtil');
const { validateRegisterInput } = require('../utils/validationUtil');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../env');

const UserController = {
    async register(req, res) {
        const { email, password } = req.body;

        try {
            validateRegisterInput(req.body);
            const user = await User.create(email, password);
            successResponse(res, user);
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            const token = jwt.sign({email, password}, JWT_SECRET, {expiresIn: '24h'});
            const data = {
                token,
            }
            successResponse(res, data);
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async getProfile(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findById(id);
            successResponse(res, user);
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async logOut(req, res) {
        try {
            //const user = await User.logOut(req.userData.userId);
            successResponse(res, user);
        } catch (err) {
            errorResponse(res, err);
        }
    }
};

module.exports = UserController;
