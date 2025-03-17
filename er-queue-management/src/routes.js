import { addPatient, waitingPatients, treatPatient, dischargePatient } from './controllers/patient.controller.js';
import { registerWebSocket } from './notifications.js';
import queue from './queue.js';
export default async function routes(fastify, options) {
    fastify.register(registerWebSocket);
    fastify.post('/patients', addPatient);
    fastify.get('/patients', waitingPatients);
    fastify.patch('/patients/:id/treat', treatPatient);
    fastify.delete('/patients/:id', dischargePatient);
    fastify.get('/getQueue', (req, res) => {
       return res.status(200).send({ status: true, data: queue.queue}) 
    });
   //  fastify.all("/*", (req, res) => {
   //      return res.status(404).send({ status: false, message: 'Route not found' }); 
   //   });

}
