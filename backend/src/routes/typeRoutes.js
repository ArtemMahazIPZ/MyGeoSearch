const typeService = require('../models/typeModel');

async function typeRoutes(fastify, options) {
    fastify.get('/types', async (req, reply) => {
        const types = await typeService.getAllTypes();
        reply.send(types);
    });

    fastify.post('/types', async (req, reply) => {
        const { name } = req.body;
        await typeService.createType(name);
        reply.code(201).send({ message: "Type created successfully" });
    });

    fastify.delete('/types/:id', async (req, reply) => {
        const { id } = req.params;
        await typeService.deleteType(id);
        reply.code(200).send({ message: "Type deleted successfully" });
    });
}

module.exports = typeRoutes;
