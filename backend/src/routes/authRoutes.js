const authController = require('../controllers/authController');

async function authRoutes(fastify, options) {
    fastify.post('/send-otp', authController.sendOtp);
    fastify.post('/verify-otp', authController.verifyOtp);
    fastify.post('/register', authController.registerDetails);
}

module.exports = authRoutes;
