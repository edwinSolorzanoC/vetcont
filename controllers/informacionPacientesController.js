
import informacionPacientesModel from "../models/informacionPacientesModel.js";

const informacionPacientesController = {}

informacionPacientesController.inicio = async(req,res) => {

    const results = [];
    
    try {
        res.render('informacionPacientes',{datos_paciente: results} )

    } catch (error) {
        res.redirect('/?error=internalError');
    }
    

}

informacionPacientesController.buscarPaciente = async(req, res) =>{

    const {nombrePropietario}= req.body;
    const idVeterinaria = req.session.user.id;
    const nombrePropietarioFinal = `%${nombrePropietario}%`;

    try {
        const results = await informacionPacientesModel.buscarPaciente(nombrePropietarioFinal, idVeterinaria);
        res.render('informacionPacientes',{datos_paciente: results});

    } catch (error) {
        res.redirect('/?error=internalError');
    }
}


informacionPacientesController.mostrarDatosSeleccionados = async (req, res) => {
    const idVeterinaria = req.session.user.id;
   
    const nombreMascota = req.body.nombreMascota.trim();
    const nombrePropietario = req.body.nombrePropietario.trim();

    
    try{
        const results = await informacionPacientesModel.obtenerDatosMascota(idVeterinaria, nombreMascota, nombrePropietario)
        res.json({
            datosPaciente: results.datosPaciente,         
            consultasGenerales: results.consultasGenerales,   
            vacunacion: results.vacunacion                 
        });
    }catch(error){
        res.redirect('/?error=internalError');
    }
   
}

export default informacionPacientesController;