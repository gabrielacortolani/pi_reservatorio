import express from "express";
import medicaoController from '../controlllers/medicaoController.js';

/*
    Rota das medições, nem todas precisam ser implementadas. 
    A rota principal é a que cria a medição.
*/
const router = express.Router();
router.get('/medicao', medicaoController.findAll);
router.get('/medicao/:id', medicaoController.findById);
router.post('/medicao', medicaoController.createMedicao);

export default router;