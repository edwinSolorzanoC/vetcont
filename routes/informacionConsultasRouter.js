import express  from "express";

const router = express.Router();

import informacionConsultasController from "../controllers/informacionConsultasController.js";

router.get('/informacionConsultas', informacionConsultasController.inicioConsultas);
export default router;