import express from 'express';
const router = express.Router();

import inicioController from '../controllers/inicioController.js';

router.get('/inicio', inicioController.peticionIncio)
router.get('/FinalizarCita/:idCita', inicioController.editarEstado)
router.get('/CancelarCita/:idCita', inicioController.cancelarCita)
router.post('/reprogramarCita', inicioController.reprogramarCita)

export default router;