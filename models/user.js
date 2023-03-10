// models/user.js

const { mapper } = require('../config/mapper');
const bcrypt = require('bcrypt');
const { NotFoundError } = require('../utils/errorUtil');
const jwtUtil = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

const User = {
    async findById(id) {
        const user = await mapper.get('user', 'selectById', { id });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    },

    async findByEmail(email) {
        const user = await mapper.get('user', 'selectByEmail', { email });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    },

    async create(email, password) {
        const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = { email, encrypted_password: encryptedPassword };
        const result = await mapper.insert('user', 'insert', user);
        user.id = result.generated_keys[0];
        return user;
    },

    async authenticate(email, password) {
        const user = await User.findByEmail(email);
        const result = await bcrypt.compare(password, user.encrypted_password);
        if (!result) {
            throw new NotFoundError('Authentication failed');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        localStorage.setItem('token', JSON.stringify(user));


        return user;
    },

    async logout(refreshToken) {
        try {
            const decoded = jwtUtil.verify(refreshToken, 'refresh');
            await mapper.delete(decoded.userId, refreshToken);
        } catch (error) {
            throw new UnauthorizedError('Invalid refresh token');
        }
    },};

module.exports = User;
