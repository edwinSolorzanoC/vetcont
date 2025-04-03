import express from 'express';
const router = express.Router();


import indexController from '../controllers/indexController.js';

router.post('/crearCuenta', indexController.crearUsuario);
router.post('/login', indexController.iniciarSesion);

export default router;