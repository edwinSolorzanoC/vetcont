import express  from "express";

const router = express.Router();

import informacionConsultasController from "../controllers/informacionConsultasController.js";

router.get('/informacionConsultas', informacionConsultasController.inicioConsultas);
router.post('/consultarCostos', informacionConsultasController.costos)
export default router;