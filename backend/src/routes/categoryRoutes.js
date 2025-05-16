const categoryService = require('../models/categoryModel');

async function categoryRoutes(fastify, options) {
    fastify.post('/categories', async (req, reply) => {
        const { name, type_id } = req.body;

        if (!name || !type_id) {
            reply.status(400).send({ message: 'Name and type_id are required' });
            return;
        }

        try {
            const newCategory = await categoryService.createCategory({ name, type_id });
            reply.status(201).send(newCategory);
        } catch (error) {
            reply.status(500).send({ message: 'Error creating category', error });
        }
    });

    fastify.get('/categories', async (req, reply) => {
        try {
            const categories = await categoryService.getAllCategories();
            reply.send(categories);
        } catch (error) {
            reply.status(500).send({ message: 'Error fetching categories', error });
        }
    });

    fastify.put('/categories/:id', async (req, reply) => {
        const { id } = req.params;
        const { name, type_id } = req.body;

        if (!name || !type_id) {
            reply.status(400).send({ message: 'Name and type_id are required' });
            return;
        }

        try {
            const success = await categoryService.updateCategory(id, { name, type_id });
            if (success) {
                reply.send({ message: 'Category updated successfully' });
            } else {
                reply.status(404).send({ message: 'Category not found' });
            }
        } catch (error) {
            reply.status(500).send({ message: 'Error updating category', error });
        }
    });

    fastify.delete('/categories/:id', async (req, reply) => {
        const { id } = req.params;

        try {
            const success = await categoryService.deleteCategory(id);
            if (success) {
                reply.send({ message: 'Category deleted successfully' });
            } else {
                reply.status(404).send({ message: 'Category not found' });
            }
        } catch (error) {
            reply.status(500).send({ message: 'Error deleting category', error });
        }
    });
}

module.exports = categoryRoutes;
