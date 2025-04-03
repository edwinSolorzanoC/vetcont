
import express from "express";

const router = express.Router();

import registrarPacintesController from "../controllers/registrarPacientesController.js";

router.post('/registrarPropietario', registrarPacintesController.registrarPropietarios);
router.post('/registrarMascota', registrarPacintesController.registrarMascotas);



export default router;