// src/server.js
import Fastify from 'fastify';
import routes from './routes.js';
import websocket from '@fastify/websocket';
import cors from "@fastify/cors";

const fastify = Fastify({ 
    logger: { level: 'info' },
});

// fastify.options('*', cors());
fastify.register(cors);
fastify.addHook('onRequest', (req, res, next) => {
    req.log.info({ method: req.method, url: req.url, body: req.body }, 'Incoming request');
    next();
});
fastify.register(websocket);

fastify.register(routes);

const start = async () => {
    try {
        await fastify.listen({  host: 'localhost', port: 3001});
        console.log(`Server running at http://localhost:3001`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
