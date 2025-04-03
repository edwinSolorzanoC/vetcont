import express from 'express';
const router = express.Router();

import administracionController from '../controllers/administracionController.js';

router.get('/administracion', administracionController.inicioAdministracion);
router.post('/consultageneral', administracionController.insertarConsultaGeneral);
router.post('/consultavacunacion', administracionController.insertaVacunacion);
router.post('/actualizarConsultas', administracionController.actualizarDatosConsultas)
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log("error en la destruccion de la sesion", err)
            return res.redirect('/');
        }
        res.redirect('/')
    })
})

export default router;