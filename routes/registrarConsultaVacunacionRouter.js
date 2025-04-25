
import express from "express";

const router = express.Router();

import registrarConsultaVacunacionController from "../controllers/registrarConsultaVacunacionController.js";
router.get('/registrarConsultaVacunacion', registrarConsultaVacunacionController.inicio)
router.post('/nuevaConsultaVacunacion', registrarConsultaVacunacionController.insertaVacunacion)
router.post('/buscarPacienteVacunacion', registrarConsultaVacunacionController.buscarPaciente)
export default router;