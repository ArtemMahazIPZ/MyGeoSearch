const locationService = require('../models/locationModel');

async function locationRoutes(fastify, options) {
    fastify.post('/locations', async (req, reply) => {
        const { type_id, category_id, coordinates, photo_url, description, work_hours } = req.body;

        if (!type_id || !category_id || !coordinates) {
            reply.status(400).send({ message: 'type_id, category_id, and coordinates are required' });
            return;
        }

        try {
            const newLocation = await locationService.createLocation({
                type_id,
                category_id,
                coordinates,
                photo_url,
                description,
                work_hours,
            });
            reply.status(201).send(newLocation);
        } catch (error) {
            reply.status(500).send({ message: 'Error creating location', error });
        }
    });

    fastify.get('/locations', async (req, reply) => {
        try {
            const locations = await locationService.getAllLocations();
            reply.send(locations);
        } catch (error) {
            reply.status(500).send({ message: 'Error fetching locations', error });
        }
    });

    fastify.patch('/locations/:id', async (req, reply) => {
        const { id } = req.params;
        const { type_id, category_id, coordinates, photo_url, description, work_hours } = req.body;

        try {
            const updated = await locationService.updateLocation(id, {
                type_id,
                category_id,
                coordinates,
                photo_url,
                description,
                work_hours,
            });
            if (updated) {
                reply.send({ message: 'Location updated successfully' });
            } else {
                reply.status(404).send({ message: 'Location not found' });
            }
        } catch (error) {
            reply.status(500).send({ message: 'Error updating location', error });
        }
    });

    fastify.delete('/locations/:id', async (req, reply) => {
        const { id } = req.params;

        try {
            const deleted = await locationService.deleteLocation(id);
            if (deleted) {
                reply.send({ message: 'Location deleted successfully' });
            } else {
                reply.status(404).send({ message: 'Location not found' });
            }
        } catch (error) {
            reply.status(500).send({ message: 'Error deleting location', error });
        }
    });
}

module.exports = locationRoutes;