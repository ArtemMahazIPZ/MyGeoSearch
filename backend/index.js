/**
 * Main server file for MyGeoSearch backend using Fastify.
 * @module Server
 */

/**
 * Creates a Fastify instance with logging enabled.
 * @type {import('fastify').FastifyInstance}
 */
const fastify = require('fastify')({ logger: true });

/**
 * Authentication routes module.
 * @type {import('fastify').RouteOptions}
 */
const authRoutes = require('./src/routes/authRoutes');

/**
 * User management routes module.
 * @type {import('fastify').RouteOptions}
 */
const userRoutes = require('./src/routes/userRoutes');

/**
 * Type management routes module.
 * @type {import('fastify').RouteOptions}
 */
const typeRoutes = require('./src/routes/typeRoutes');

/**
 * Category management routes module.
 * @type {import('fastify').RouteOptions}
 */
const categoryRoutes = require('./src/routes/categoryRoutes');

/**
 * Location management routes module.
 * @type {import('fastify').RouteOptions}
 */
const locationRoutes = require('./src/routes/locationRoutes');

require('dotenv').config();

/**
 * Registers CORS plugin to handle cross-origin requests.
 * @function
 * @param {Object} options - Configuration options for CORS.
 * @param {boolean|string|string[]} options.origin - Specifies the allowed origins.
 */
fastify.register(require('@fastify/cors'), { origin: true });

/**
 * Registers JWT plugin for authentication.
 * @function
 * @param {Object} options - Configuration options for JWT.
 * @param {string} options.secret - Secret key for JWT signing and verification.
 */
fastify.register(require('@fastify/jwt'), { secret: process.env.JWT_SECRET });

/**
 * Registers authentication routes with a prefix.
 * @function
 * @param {string} prefix - URL prefix for auth routes (e.g., '/api/auth').
 */
fastify.register(authRoutes, { prefix: '/api/auth' });

/**
 * Registers user management routes.
 * @function
 */
fastify.register(userRoutes, { prefix: '/api' });

/**
 * Registers type management routes.
 * @function
 */
fastify.register(typeRoutes, { prefix: '/api' });

/**
 * Registers category management routes.
 * @function
 */
fastify.register(categoryRoutes, { prefix: '/api' });

/**
 * Registers location management routes.
 * @function
 */
fastify.register(locationRoutes, { prefix: '/api' });

/**
 * Starts the Fastify server.
 * @function start
 * @async
 * @returns {Promise<void>} Resolves when the server is successfully started, rejects on error.
 * @throws {Error} If the server fails to start.
 */
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT });
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();