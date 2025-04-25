import express from "express";

const router = express.Router();

import registrarCitasController from "../controllers/registrarCitasController.js";

router.get('/registrarCitas', registrarCitasController.inicio)
router.post('/buscarPacienteCitas', registrarCitasController.buscarPaciente);
router.post('/registrarNuevaCita', registrarCitasController.nuevaCita)
export default router;