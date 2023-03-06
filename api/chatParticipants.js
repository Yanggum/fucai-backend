const connection = require('../api/connector');

// GET all chat participants
const getAllChatParticipants = (req, res) => {
    connection.query('SELECT * FROM chat_participants')
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// GET chat participants for a specific chat
const getChatParticipantsByChatId = (req, res) => {
    const { chat_id } = req.params;
    connection.query('SELECT * FROM chat_participants WHERE chat_id = ?', [chat_id])
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// GET chat participants for a specific character
const getChatParticipantsByCharacterId = (req, res) => {
    const { character_id } = req.params;
    connection.query('SELECT * FROM chat_participants WHERE character_id = ?', [character_id])
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// ADD a new chat participant
const addChatParticipant = (req, res) => {
    const { chat_id, character_id } = req.body;
    connection.query('INSERT INTO chat_participants (chat_id, character_id) VALUES (?, ?)', [chat_id, character_id])
        .then(() => {
            res.status(201).json({ message: 'Chat participant added successfully' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// DELETE a chat participant
const deleteChatParticipant = (req, res) => {
    const { chat_id, character_id } = req.body;
    connection.query('DELETE FROM chat_participants WHERE chat_id = ? AND character_id = ?', [chat_id, character_id])
        .then(() => {
            res.status(200).json({ message: 'Chat participant deleted successfully' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// UPDATE a chat participant
const updateChatParticipant = (req, res) => {
    const { chat_id, character_id } = req.params;
    const { new_chat_id, new_character_id } = req.body;
    connection.query('UPDATE chat_participants SET chat_id = ?, character_id = ? WHERE chat_id = ? AND character_id = ?', [new_chat_id, new_character_id, chat_id, character_id])
    .then(() => {
        res.status(200).json({ message: 'Chat participant updated successfully' });
    })
    .catch(error => {
        res.status(500).json({ error });
    });
};

module.exports = {
    getAllChatParticipants,
    getChatParticipantsByChatId,
    getChatParticipantsByCharacterId,
    addChatParticipant,
    deleteChatParticipant,
    updateChatParticipant
}
