
import express  from "express";
import informacionCitasController from "../controllers/informacionCitasController.js";

const router = express.Router();

router.get('/informacionCitas', informacionCitasController.pedirCitas)
router.post('/buscarCitas', informacionCitasController.buscarCitas)
router.get('/cancelarCitaInformacion/:idCita', informacionCitasController.cancelarCita)
router.post('/reprogramarCitaInformacion', informacionCitasController.reprogramarCita)

export default router