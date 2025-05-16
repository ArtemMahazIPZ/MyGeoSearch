const db = require('../utils/db');

async function findUserByPhone(phone_number) {
    const [rows] = await db.query('SELECT * FROM users WHERE phone_number = ?', [phone_number]);
    return rows[0];
}

async function createUser(phone_number, otp_code) {
    await db.query('INSERT INTO users (phone_number, otp_code) VALUES (?, ?)', [phone_number, otp_code]);
}

async function updateOtp(phone_number, otp_code) {
    await db.query('UPDATE users SET otp_code = ? WHERE phone_number = ?', [otp_code, phone_number]);
}

async function verifyOtp(phone_number, otp_code) {
    const [rows] = await db.query('SELECT * FROM users WHERE phone_number = ? AND otp_code = ?', [phone_number, otp_code]);
    return rows[0];
}

async function updateUserDetails(phone_number, name, surname) {
    await db.query('UPDATE users SET name = ?, surname = ? WHERE phone_number = ?', [name, surname, phone_number]);
}

async function getAllUsers() {
    const [rows] = await db.query('SELECT * FROM users WHERE role = "user"');
    return rows;
}
async function updateUserDetailsById(id, name, surname, phone_number) {
    const query = 'UPDATE users SET name = ?, surname = ?, phone_number = ? WHERE id = ?';
    await db.query(query, [name, surname, phone_number, id]);
}

async function deleteUserById(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    await db.query(query, [id]);
}

module.exports = {
    findUserByPhone,
    createUser,
    updateOtp,
    verifyOtp,
    updateUserDetails,
    getAllUsers,
    updateUserDetailsById,
    deleteUserById
};
