import express from 'express';
const router = express.Router();

import inicioController from '../controllers/inicioController.js';

router.get('/inicio', inicioController.peticionIncio)

export default router;