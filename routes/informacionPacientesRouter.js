
import express from "express";
const router = express.Router();

import informacionPacientesController from "../controllers/informacionPacientesController.js";

router.get('/informacionPacientes', informacionPacientesController.inicio)
router.post('/buscarPaciente', informacionPacientesController.buscarPaciente);

export default router;