const userService = require('../models/userModel');
const otpGenerator = require('../utils/otpGenerator');
const jwt = require('fastify-jwt');

async function sendOtp(req, reply) {
    const { phone_number } = req.body;
    let user = await userService.findUserByPhone(phone_number);
    const otp = otpGenerator.generateOtp();

    if (user) {
        await userService.updateOtp(phone_number, otp);
    } else {
        await userService.createUser(phone_number, otp);
    }

    reply.send({ message: `OTP generated: ${otp}` });
}

async function verifyOtp(req, reply) {
    const { phone_number, otp_code } = req.body;
    const user = await userService.verifyOtp(phone_number, otp_code);

    if (!user) {
        return reply.status(400).send({ message: 'Invalid OTP' });
    }

    const token = await reply.jwtSign({ phone_number, role: user.role });
    reply.send({ token, message: 'OTP verified successfully!' });
}

async function registerDetails(req, reply) {
    const { phone_number, name, surname } = req.body;
    await userService.updateUserDetails(phone_number, name, surname);
    reply.send({ message: 'User details updated successfully!' });
}

module.exports = { sendOtp, verifyOtp, registerDetails };
