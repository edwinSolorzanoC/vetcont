
import inicioModel from "../models/inicioModel.js";


const inicioController = {};

inicioController.peticionIncio = async (req,res) => {

    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/?error=sesionError');
    }
    const idVeterinaria = req.session.user.id;
    const ahora = new Date();
    const fechaAutomatica = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;


    try {
        
        const { citas, consultasGenerales, consultasVacunacion } = await inicioModel.inicio(idVeterinaria, fechaAutomatica);

        const consultasTotales = [...consultasGenerales, ...consultasVacunacion];
        res.render('inicio', {
            citas,
            consultasTotales
        });
        
        
    } catch (error) {
        res.redirect('/?error=internalError');
    }
}

inicioController.editarEstado = async(req,res) => {
    const idCita = req.params.idCita;
    try {
        await inicioModel.finalizarCita(idCita);
        await inicioController.peticionIncio(req,res);
    } catch (error) {
        res.redirect('/?error=internalError');
    }
}

inicioController.cancelarCita = async(req,res) => {
    const idCita = req.params.idCita;
    try {
        await inicioModel.cancelarCita(idCita);
        await inicioController.peticionIncio(req,res);
    } catch (error) {
        res.redirect('/?error=internalError');
    }
}

inicioController.reprogramarCita = async(req,res) => {
    const {idCitaFormulario,
        nuevaFechaRprogramada,
        nuevaHoraReprogramada,
        descripcionReprogramada
    } = req.body;

    try {
        
        await inicioModel.reprogramarCita(idCitaFormulario,
        nuevaFechaRprogramada,
        nuevaHoraReprogramada,
        descripcionReprogramada);

        
        res.redirect('/inicio?success=citaReprogramada');

    } catch (error) {
        console.log(error)
    }
}
export default inicioController;