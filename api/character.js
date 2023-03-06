const connection = require('../api/connector');

// GET all characters
const getAllCharacters = (event, context, callback) => {
    connection.query('SELECT * FROM characters', (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            const response = {
                statusCode: 200,
                body: JSON.stringify(results)
            };
            callback(null, response);
        }
    });
};

// GET a single character by ID
const getCharacterById = (event, context, callback) => {
    const { id } = event.pathParameters;
    connection.query('SELECT * FROM characters WHERE id = ?', [id], (error, results) => {
        if (error) {
            callback(error, null);
        } else if (results.length === 0) {
            const response = {
                statusCode: 404,
                body: JSON.stringify({ message: `Character with ID ${id} not found` })
            };
            callback(null, response);
        } else {
            const response = {
                statusCode: 200,
                body: JSON.stringify(results[0])
            };
            callback(null, response);
        }
    });
};

// INSERT a new character
const createCharacter = (event, context, callback) => {
    const { slug, name, description, avatar_id, greeting, persona, world_scenario, example_chats, visibility, is_contentious, creator_id } = JSON.parse(event.body);
    connection.query('INSERT INTO characters (slug, name, description, avatar_id, greeting, persona, world_scenario, example_chats, visibility, is_contentious, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [slug, name, description, avatar_id, greeting, persona, world_scenario, example_chats, visibility, is_contentious, creator_id], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            const response = {
                statusCode: 201,
                body: JSON.stringify({ message: 'Character created successfully', id: results.insertId })
            };
            callback(null, response);
        }
    });
};

// UPDATE an existing character
const updateCharacter = (event, context, callback) => {
    const { id } = event.pathParameters;
    const { slug, name, description, avatar_id, greeting, persona, world_scenario, example_chats, visibility, is_contentious, creator_id } = JSON.parse(event.body);
    connection.query('UPDATE characters SET slug = ?, name = ?, description = ?, avatar_id = ?, greeting = ?, persona = ?, world_scenario = ?, example_chats = ?, visibility = ?, is_contentious = ?, creator_id = ? WHERE id = ?', [slug, name, description, avatar_id, greeting, persona, world_scenario, example_chats, visibility, is_contentious, creator_id, id], (error, results) => {
        if (error) {
            callback(error, null);
        } else if (results.affectedRows === 0) {
            const response = {
                statusCode: 404,
                body: JSON.stringify({ message: `Character with ID ${id} not found` })
            };
            callback(null, response);
        } else {
            const response = {
                statusCode: 200,
                body: JSON.stringify({ message: 'Character updated successfully' })
            };
            callback(null, response);
        }
    });
};

// DELETE an existing character
const deleteCharacter = (event, context, callback) => {
    const { id } = event.pathParameters;
    connection.query('DELETE FROM characters WHERE id = ?', [id], (error, results) => {
        if (error) {
            callback(error, null);
        } else if (results.affectedRows === 0) {
            const response = {
                statusCode: 404,
                body: JSON.stringify({ message: `Character with ID ${id} not found` })
            };
            callback(null, response);
        } else {
            const response = {
                statusCode: 200,
                body: JSON.stringify({ message: 'Character deleted successfully' })
            };
            callback(null, response);
        }
    });
};

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
}
