import express from "express";
import sensorController from '../controlllers/sensorController.js';

/*
    Rota dos sensores
*/
const router = express.Router();
router.get('/sensor', sensorController.findAll);
router.get('/sensor/:id', sensorController.findById);
router.post('/sensor', sensorController.createSensor);
router.put('/sensor/:id', sensorController.updateSensor);
router.delete('/sensor/:id', sensorController.deleteSensor);
export default router;