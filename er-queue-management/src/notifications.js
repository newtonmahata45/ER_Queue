let clients = [];

export function registerWebSocket(fastify) {
    fastify.get('/ws', { websocket: true }, (connection, req) => {
        clients.push(connection);

        connection.on('close', () => {
            clients = clients.filter(client => client !== connection);
        });
    });
}

export function broadcast(message) {
    console.log('broadcasting', clients.length);
    clients.forEach(client => {
        if (client.readyState === 1) { 
            client.send(JSON.stringify(message)); 
        }
    });
}
