const otpGenerator = require('../utils/otpGenerator');
const userModel = require('../models/userModel');

async function generateAndSaveOtp(phone_number) {
    const otp = otpGenerator.generateOtp();
    const user = await userModel.findUserByPhone(phone_number);

    if (user) {
        await userModel.updateOtp(phone_number, otp);
    } else {
        await userModel.createUser(phone_number, otp);
    }

    return otp;
}

module.exports = { generateAndSaveOtp };
