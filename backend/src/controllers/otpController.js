const userService = require('../models/userModel');
const otpGenerator = require('../utils/otpGenerator');

async function generateOtp(req, reply) {
    const { phone_number } = req.body;
    const otp = otpGenerator.generateOtp();
    await userService.updateOtp(phone_number, otp);
    reply.send({ otp });
}
module.exports = { generateOtp };
