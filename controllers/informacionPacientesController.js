
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

    const {cedulaPropietario}= req.body;
    const idVeterinaria = req.session.user.id;

    try {
        const results = await informacionPacientesModel.buscarPaciente(cedulaPropietario, idVeterinaria);
        res.render('informacionPacientes',{datos_paciente: results});

    } catch (error) {
        console.log("ERROR:C:PETICION:START: ", error)
        res.redirect('/?error=internalError');
    }
}

export default informacionPacientesController;