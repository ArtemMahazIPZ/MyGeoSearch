const db = require('../utils/db');

async function createCategory({ name, type_id }) {
    const [result] = await db.query(
        `INSERT INTO categories (name, type_id) VALUES (?, ?)`,
        [name, type_id]
    );
    return { id: result.insertId, name, type_id };
}

async function getAllCategories() {
    const [rows] = await db.query(
        `SELECT c.id, c.name, t.name AS type_name
         FROM categories c
         LEFT JOIN types t ON c.type_id = t.id`
    );
    return rows;
}

async function updateCategory(id, { name, type_id }) {
    const [result] = await db.query(
        `UPDATE categories SET name = ?, type_id = ? WHERE id = ?`,
        [name, type_id, id]
    );
    return result.affectedRows > 0;
}

async function deleteCategory(id) {
    const [result] = await db.query(
        `DELETE FROM categories WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0;
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
