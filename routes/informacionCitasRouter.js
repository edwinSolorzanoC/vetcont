
import express  from "express";
import informacionCitasController from "../controllers/informacionCitasController.js";

const router = express.Router();

router.get('/informacionCitas', informacionCitasController.pedirCitas)
router.post('/buscarCitas', informacionCitasController.buscarCitas)

export default router