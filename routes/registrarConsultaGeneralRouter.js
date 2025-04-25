
import express from "express";
const router = express.Router();

import registrarConsultaGeneralController from "../controllers/registrarConsultaGeneralController.js";
router.get('/registrarConsultaGeneral', registrarConsultaGeneralController.inicio)
router.post('/buscarPacienteConsultas', registrarConsultaGeneralController.buscarPaciente);
router.post('/registrarConsultaGeneral', registrarConsultaGeneralController.insertarConsultaGeneral)
export default router