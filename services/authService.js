// services/authService.js

const User = require('../api/user');
const { UnauthorizedError } = require('../utils/errorUtil');
const { generatePasswordHash } = require('../utils/authUtil');

const AuthService = {
    async login(email, password) {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new UnauthorizedError('Invalid email or password');
        }
        const isPasswordMatch = await User.checkPassword(user, password);
        if (!isPasswordMatch) {
            throw new UnauthorizedError('Invalid email or password');
        }
        return user;
    },

    async register(email, password) {
        const encryptedPassword = generatePasswordHash(password);
        const user = await User.create(email, encryptedPassword);
        return user;
    },
};

module.exports = AuthService;
