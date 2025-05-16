const userService = require('../models/userModel');

async function userRoutes(fastify, options) {
    fastify.get('/users', async (req, reply) => {
        const users = await userService.getAllUsers();
        reply.send(users);
    });
    fastify.patch('/users/:id', async (req, reply) => {
        const { id } = req.params;
        const { name, surname, phone_number } = req.body;

        try {
            await userService.updateUserDetailsById(id, name, surname, phone_number);
            reply.send({ message: 'User updated successfully' });
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Failed to update user' });
        }
    });
    fastify.delete('/users/:id', async (req, reply) => {
        const { id } = req.params;

        try {
            await userService.deleteUserById(id);
            reply.send({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Failed to delete user' });
        }
    });
}

module.exports = userRoutes;
