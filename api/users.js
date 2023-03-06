const pool = require('../api/connector');

const getUsers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } finally {
        if (conn) return conn.end();
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } finally {
        if (conn) return conn.end();
    }
};

const createUser = async (req, res) => {
    const { email, encrypted_password } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('INSERT INTO users (email, encrypted_password) VALUES (?, ?)', [email, encrypted_password]);
        res.status(201).json({ id: rows.insertId, email, encrypted_password });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } finally {
        if (conn) return conn.end();
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { email, encrypted_password } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('UPDATE users SET email = ?, encrypted_password = ? WHERE id = ?', [email, encrypted_password, id]);
        res.status(200).json({ id, email, encrypted_password });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } finally {
        if (conn) return conn.end();
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('DELETE FROM users WHERE id = ?', [id]);
        res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } finally {
        if (conn) return conn.end();
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
