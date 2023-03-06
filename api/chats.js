const connection = require('../api/connector');

// GET all chats
const getAllChats = async (req, res) => {
    let conn;
    try {
        conn = await connection.getConnection();
        const rows = await conn.query('SELECT * FROM chats');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        if (conn) await conn.release();
    }
};

// GET a single chat by ID
const getChatById = async (req, res) => {
    const { id } = req.params;
    let conn;
    try {
        conn = await connection.getConnection();
        const rows = await conn.query('SELECT * FROM chats WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: `Chat with ID ${id} not found` });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        if (conn) await conn.release();
    }
};

// INSERT a new chat
const createChat = async (req, res) => {
    const { creator_id, name } = req.body;
    const id = uuidv4();
    let conn;
    try {
        conn = await connection.getConnection();
        await conn.query('INSERT INTO chats (id, creator_id, name) VALUES (?, ?, ?)', [id, creator_id, name]);
        res.status(201).json({ message: 'Chat created successfully', id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        if (conn) await conn.release();
    }
};

// UPDATE an existing chat
const updateChat = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let conn;
    try {
        conn = await connection.getConnection();
        const result = await conn.query('UPDATE chats SET name = ? WHERE id = ?', [name, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: `Chat with ID ${id} not found` });
        } else {
            res.status(200).json({ message: 'Chat updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        if (conn) await conn.release();
    }
};

// DELETE a chat by ID
const deleteChat = async (req, res) => {
    const { id } = req.params;
    let conn;
    try {
        conn = await connection.getConnection();
        const result = await conn.query('DELETE FROM chats WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: `Chat with ID ${id} not found` });
        } else {
            res.status(200).json({ message: 'Chat deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        if (conn) await conn.release();
    }
};

module.const = {
    getAllChats,
    getChatById,
    createChat,
    updateChat,
    deleteChat,
}
