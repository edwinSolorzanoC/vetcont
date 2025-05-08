

const registrarCitasController = {};

import registrarCitasModel from '../models/registrarCitasModel.js'

registrarCitasController.inicio = async(req,res) => {

    const results = [];
    
    try {
        res.render('registrarCitas',{datos_paciente: results} )

    } catch (error) {
        res.redirect('/?error=internalError');
    }

};


registrarCitasController.buscarPaciente = async(req, res) =>{

    const {cedulaPropietario}= req.body;

    if (!req.session || !req.session.user || !req.session.user.id) {
        console.log("Erroe en el id")
        return res.redirect('/?error=sesionError');
    }
    const idVeterinaria = req.session.user.id;

    try {
        const results = await registrarCitasModel.buscarPaciente (cedulaPropietario, idVeterinaria);
        res.render('registrarCitas',{datos_paciente: results});

    } catch (error) {
        res.redirect('/?error=internalError');
    }
}

registrarCitasController.nuevaCita = async(req,res) => {

    if (!req.session || !req.session.user || !req.session.user.id) {
        console.log("Erroe en el id")
        return res.redirect('/?error=sesionError');
    }
    const idVeterinaria = req.session.user.id;

    const {nombrePropietarioCita,
        nombreMascotaCita,
        fechaCita,
        horaCita,
        motivoCita
    } = req.body;

    const estadoCita = 1;
    try {
        
        await registrarCitasModel.nuevaCita(nombrePropietarioCita, nombreMascotaCita, idVeterinaria,

            fechaCita,
            horaCita,
            estadoCita,
            motivoCita
        )

        res.redirect('registrarCitas?success=saveCita')
    } catch (error) {
        console.log(error)
        if (error.message === 'horaNoDisponible') {
            res.redirect('/registrarCitas?error=nodisponible');
          } else if (error.message === 'errorInterno') {
            res.redirect('/inicio?error=internalError');
          }
    }
}
export default registrarCitasController;