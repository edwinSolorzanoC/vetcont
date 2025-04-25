
import express from "express";
const router = express.Router();

import informacionPacientesController from "../controllers/informacionPacientesController.js";

router.get('/informacionPacientes', informacionPacientesController.inicio);
router.post('/buscarPacienteInformacion', informacionPacientesController.buscarPaciente);
router.post('/datosMascota', informacionPacientesController.mostrarDatosSeleccionados);

export default router;