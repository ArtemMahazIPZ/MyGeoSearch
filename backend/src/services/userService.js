const userModel = require('../models/userModel');

async function registerUserDetails(phone_number, name, surname) {
    return await userModel.updateUserDetails(phone_number, name, surname);
}

async function getAllRegisteredUsers() {
    return await userModel.getAllUsers();
}

module.exports = { registerUserDetails, getAllRegisteredUsers };
