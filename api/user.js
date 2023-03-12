const database = require('../config/database');
const bcrypt = require("bcrypt");

const User = {
    async findByEmail(email) {
        try {
            const users = await database.select('*').from('users').where({ email: email });
            if (users.length === 0) {
                return null;
            }

            return users[0];
        } catch {
            return null;
        }
    },

    async create(email, password, salt = 10, nickname = 'test') {
        try {
            return await database('users').insert({
                email: email,
                encrypted_password: await bcrypt.hash(password, salt),
                salt,
                name: nickname,
                created_at: new Date(),
                updated_at: new Date(),
            });
        } catch (error) {
            console.error(err)
            return null;
        }
    },

    async update(id, email, hashedPassword, salt, nickname) {
        try {
            return await database('users').where({ id }).update({
                email,
                encrypted_password: hashedPassword,
                salt,
                nickname,
                id,
            });
        } catch {
            return null;
        }
    },

    async findById(id) {
        try {
            const users = await database.select('*').from('users').where({ id });

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
            return await database('users').where({ id }).del();
        } catch {
            return null
        }
    },

    //TODO: 해당구현없음.
    async logout(id) {
        try {
            return await connector.mybatisQuery("users.updateLastLogout", { id });
        } catch {
            return null;
        }
    },

    async login(email, password) {
        try {
            const user = await User.findByEmail(email);
            if (user === null) {
                return false;
            }

            return await bcrypt.compare(password, user.encryptedPassword);
        } catch {
            return null;
        }
    },
};

module.exports = User;
