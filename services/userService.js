// services/userService.js

const User = require('../api/user');
const { BadRequestError, UnauthorizedError } = require('../utils/errorUtil');
const { comparePasswords, hashPassword } = require('../utils/authUtil');

const UserService = {
    async getUserById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new BadRequestError(`User with ID ${id} not found`);
        }
        return user;
    },

    async getUserByEmail(email) {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new BadRequestError(`User with email ${email} not found`);
        }
        return user;
    },

    async register(email, password) {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new BadRequestError(`User with email ${email} already exists`);
        }
        const encryptedPassword = await hashPassword(password);
        const user = await User.create(email, encryptedPassword);
        return user;
    },

    async login(email, password) {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new UnauthorizedError('Invalid email or password');
        }
        const passwordMatch = await comparePasswords(password, user.encryptedPassword);
        if (!passwordMatch) {
            throw new UnauthorizedError('Invalid email or password');
        }
        return user;
    },
};

module.exports = UserService;
