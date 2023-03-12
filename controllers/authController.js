// controllers/authController.js

const User = require('../api/user');
const { successResponse, errorResponse } = require('../utils/responseUtil');
const { UnauthorizedError } = require('../utils/errorUtil');
const { generatePasswordHash } = require('../utils/authUtil');

const AuthController = {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findByEmail(email);
            if (!user) {
                throw new UnauthorizedError('Invalid email or password');
            }
            const isPasswordMatch = await User.checkPassword(user, password);
            if (!isPasswordMatch) {
                throw new UnauthorizedError('Invalid email or password');
            }
            req.session.userId = user.id;
            successResponse(res, user);
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async register(req, res) {
        const { email, password } = req.body;
        const encryptedPassword = generatePasswordHash(password);

        try {
            const user = await User.create(email, encryptedPassword);
            req.session.userId = user.id;
            successResponse(res, user);
        } catch (err) {
            errorResponse(res, err);
        }
    },

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                errorResponse(res, err);
            } else {
                successResponse(res, {});
            }
        });
    },

    async getCurrentUser(req, res) {
        const { userId } = req.session;

        try {
            const user = await User.findById(userId);
            successResponse(res, user);
        } catch (err) {
            errorResponse(res, err);
        }
    },
};

module.exports = AuthController;
