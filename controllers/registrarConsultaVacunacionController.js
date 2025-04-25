
import registrarConsultaVacunacionModel from '../models/registrarConsultaVacunacionModel.js'

const registrarConsultaVacunacionController = {}


registrarConsultaVacunacionController.inicio = async(req,res) => {

    const results = [];
    
    try {
        res.render('registrarConsultaVacunacion',{datos_paciente: results} )

    } catch (error) {
        res.redirect('/?error=internalError');
    }

}


registrarConsultaVacunacionController.buscarPaciente = async(req, res) =>{

    const {cedulaPropietario}= req.body;
    const idVeterinaria = req.session.user.id;

    try {
        const results = await registrarConsultaVacunacionModel.buscarPaciente(cedulaPropietario, idVeterinaria);
        res.render('registrarConsultaVacunacion',{datos_paciente: results});

    } catch (error) {
        console.log("ERROR:C:PETICION:START: ", error)
        res.redirect('/?error=internalError');
    }
}


registrarConsultaVacunacionController.insertaVacunacion = async (req, res) => {
    const {
        nombrePropietarioVacunacion,
        nombrePacienteVacunacion,
        pesoVacunacion, 
        nombreInyeccionVacunacion,
        nombreInyeccionDesparacitacion,
        costoMedicamentosVacunacion,
        costoExtrasVacunacion,
        costoServiciosVacunacion,
        costoDescripcionVacunacion
    } = req.body;

    const idVeterinaria = req.session.user.id
    const ScostoMedicamentosVacunacion = Number(costoMedicamentosVacunacion) || 0;
    const ScostoExtrasVacunacion = Number(costoExtrasVacunacion) || 0;
    const ScostoServiciosVacunacion = Number(costoServiciosVacunacion) || 0;

    const costoTotalVacunacion = ScostoMedicamentosVacunacion + ScostoExtrasVacunacion + ScostoServiciosVacunacion;

    const fechaAutomatica = new Date().toISOString().slice(0, 10); // Formato: YYYY-MM-DD

    const costoTipoVacunacion = "Consulta Vacunacion"


    try{

        const results = await registrarConsultaVacunacionModel.registrarConsulta(
            nombrePropietarioVacunacion,
            nombrePacienteVacunacion, 
            pesoVacunacion,

            nombreInyeccionVacunacion, 
            nombreInyeccionDesparacitacion,
            fechaAutomatica,

            idVeterinaria,
            costoServiciosVacunacion,
            costoMedicamentosVacunacion, 
            costoExtrasVacunacion,  
            costoDescripcionVacunacion,
            costoTotalVacunacion,
            costoTipoVacunacion
        )
        return res.redirect('/registrarConsultaVacunacion?success=consultaUpdate');

    }catch(error){
        console.log("ERROR:ADMIN:CONSULTAVAC: ", error)
        res.redirect('/registrarConsultaVacunacion?error=internalError');
    }

}

export default registrarConsultaVacunacionController;