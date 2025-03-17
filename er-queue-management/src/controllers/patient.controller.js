import queue from '../queue.js';

const addPatient = async (req, res) => {
    try {
        const { name, triageLevel } = req.body;
    
        if (!name) return res.status(400).send({ status: false, message: 'name is mandatory in body' });
        if (![1, 2, 3, 4, 5].includes(triageLevel)) return res.status(400).send({ status: false, message: 'triageLevel should be in between 1-5' });
        
    
        const patient = queue.addPatient(name, triageLevel);
        return res.status(201).send({ status: true, message: 'Patient added', patient });
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message });
    }
};

const waitingPatients = async (req, res) => {
    try {
        const waiting = queue.waitingPatients();
        if (!waiting.length) return res.status(400).send({ status: false, message: 'Queue is empty', data: [] });
        return res.status(200).send({ status: true, data: waiting });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const treatPatient = async (req, res) => {
    try {
    const { id } = req.params;
    const result = queue.treatPatient(id);

    if (!result) {
        return res.status(404).send({ status: false, message: 'Patient not found' });
    }

    return res.status(200).send({ status: true, message: 'Patient being treated', patient: result });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const dischargePatient = async (req, res) => {
    try {
    const { id } = req.params;
    const result = queue.dischargePatient(id);

    if (!result) {
        return res.status(404).send({ status: false, message: 'Patient not found' });
    }

    return res.status(200).send({ status: true, message: 'Patient discharged', patient: result });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

export  { 
    addPatient,
    waitingPatients,
    treatPatient,
    dischargePatient
};