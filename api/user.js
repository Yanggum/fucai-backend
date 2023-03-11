const connector = require('../config/connector');
const bcrypt = require("bcrypt");

const User = {
    async findByEmail(email) {
        try {
            const users = await connector.mybatisQuery("users.selectByEmail", { email });
            if (users.length === 0) {
                return null;
            }

            return users[0];
        } catch {
            return null;
        }
    },

    async create(email, password, salt=10, nickname='test') {
        try {
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = {
                email,
                encryptedPassword: hashedPassword,
                salt,
                nickname,
            };
            return await connector.mybatisQuery("users.insert", user);
        } catch {
            return null;
        }
    },

    async update(id, email, hashedPassword, salt, nickname) {
        try {
            const updatedUser = {
                email,
                password: hashedPassword,
                salt,
                nickname,
                id,
            };

            return await connector.mybatisQuery("users.update", updatedUser);
        } catch {
            return null;
        }
    },

    async findById(id) {
        try {
            const users = await connector.mybatisQuery("users.selectById", { id });

            if (users.length === 0) {
                return null;
            }

            return users[0];
        } catch (e) {
            return null;
        }
    },

    async delete(id) {
        try {
            return await connector.mybatisQuery("users.delete", { id });
        } catch {
            return null
        }
    },

    async logout(id) {
        try {
            return await connector.mybatisQuery("users.updateLastLogout", { id });
        } catch {
            return null;
        }
    },

    async login(email) {
        try {
            return await connector.mybatisQuery("users.updateLastLogin", { email });
        } catch {
            return null;
        }
    },
};

module.exports = User;
