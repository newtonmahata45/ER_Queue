import { broadcast } from './notifications.js';
import { v4 as uuidv4 } from 'uuid';

class PatientQueue {
    constructor() {
        this.queue = [];
    }
    
    addPatient(name, triageLevel) {
        const patient = {
            id: uuidv4(),
            name,
            triageLevel,
            arrivalTime: Date.now(),
            status: 'waiting' // possible values: 'waiting', 'being treated', 'discharged'
        };
        const index = this.queue.findIndex(p => p.triageLevel > triageLevel);
        if (index == -1) this.queue.push(patient);
        else this.queue.splice(index, 0, patient);  
        if (triageLevel === 1) {
            broadcast({ type: 'CRITICAL_PATIENT', message: `${name} requires immediate attention!` });
        }
        return patient;
    }

    waitingPatients() {
        const data =[]
        this.queue.forEach(patient => {
            if(patient.status === 'waiting'){
                let obj = {...patient};
                obj.arrivalTime = new Date(obj.arrivalTime);
                data.push(obj);
            }
        });
        return data;
    }

    treatPatient(id) {
        const patient = this.queue.find(p => p.id === id && p.status === 'waiting');
        if (!patient) return null;
        patient.status = 'being treated';
        return patient;
    }

    dischargePatient(id) {
        const index = this.queue.findIndex(p => p.id === id);
        if (index === -1) return null;

        const [patient] = this.queue.splice(index, 1);
        patient.status = 'discharged';
        return patient;
    }

    // sortQueue() {
    //     this.queue.sort((a, b) =>  a.triageLevel - b.triageLevel || a.arrivalTime - b.arrivalTime);
    // }
}

export default new PatientQueue();
