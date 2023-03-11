// controllers/authController.js

const User = require('../api/user');
const { handleSuccess, handleError } = require('../utils/responseUtil');
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
            handleSuccess(res, user);
        } catch (err) {
            handleError(res, err);
        }
    },

    async register(req, res) {
        const { email, password } = req.body;
        const encryptedPassword = generatePasswordHash(password);

        try {
            const user = await User.create(email, encryptedPassword);
            req.session.userId = user.id;
            handleSuccess(res, user);
        } catch (err) {
            handleError(res, err);
        }
    },

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                handleError(res, err);
            } else {
                handleSuccess(res, {});
            }
        });
    },

    async getCurrentUser(req, res) {
        const { userId } = req.session;

        try {
            const user = await User.findById(userId);
            handleSuccess(res, user);
        } catch (err) {
            handleError(res, err);
        }
    },
};

module.exports = AuthController;
