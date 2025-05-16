const db = require('../utils/db');

async function getAllTypes() {
    const [rows] = await db.query('SELECT * FROM types');
    return rows;
}

async function createType(name) {
    await db.query('INSERT INTO types (name) VALUES (?)', [name]);
}

async function deleteType(id) {
    await db.query('DELETE FROM types WHERE id = ?', [id]);
}

module.exports = { getAllTypes, createType, deleteType };
