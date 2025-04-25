
import express  from "express";
import informacionCitasController from "../controllers/informacionCitasController.js";

const router = express.Router();

router.get('/informacionCitas', informacionCitasController.pedirCitas)

export default router