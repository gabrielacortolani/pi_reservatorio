import express from "express";
import reservatorioController from '../controlllers/reservatorioController.js';

/*
    Rota dos reservatórios
 */
const router = express.Router();
router.get('/reservatorio', reservatorioController.findAll);
router.get('/reservatorio/:id', reservatorioController.findById);
router.post('/reservatorio', reservatorioController.createReservatorio);
router.put('/reservatorio/:id', reservatorioController.updateReservatorio);
router.delete('/reservatorio/:id', reservatorioController.deleteReservatorio);
export default router;