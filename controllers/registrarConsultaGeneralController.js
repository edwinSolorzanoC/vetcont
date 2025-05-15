
import registrarConsultaGeneralModel from "../models/registrarConsultaGeneralModel.js";

const registrarConsultaGeneralController = {}

registrarConsultaGeneralController.inicio = async(req,res) => {

    const results = [];
    
    try {
        res.render('registrarConsultaGeneral',{datos_paciente: results} )

    } catch (error) {
        res.redirect('/?error=internalError');
    }

}

registrarConsultaGeneralController.buscarPaciente = async(req, res) =>{

    const {nombrePropietario}= req.body;
    const idVeterinaria = req.session.user.id;

    const nombrePropietarioFinal = `%${nombrePropietario}%`;

    try {
        const results = await registrarConsultaGeneralModel.buscarPaciente (nombrePropietarioFinal, idVeterinaria);
        res.render('registrarConsultaGeneral',{datos_paciente: results});

    } catch (error) {
        res.redirect('/?error=internalError');
    }
}


registrarConsultaGeneralController.insertarConsultaGeneral = async (req, res) => {
    
    const nombrePropietarioConsulta = req.body.nombrePropietarioConsulta.trim();
    const nombreMascotaConsulta = req.body.nombreMascotaConsulta.trim();

    const {
        pesoMascotaConsulta,
        motivoConsulta,
        medicamentosConsulta, 

        costosServiciosConsulta,
        costosMedicamentosConsulta,
        costosExtrasConsulta,
        notaCostosConsulta,

    } = req.body;

    
    const idVeterinaria = req.session.user.id;

    const ahora = new Date();
    const fechaAutomatica = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;

    const ScostoMedicamentosGeneral = Number(costosMedicamentosConsulta) || 0;
    const ScostoExtrasGeneral = Number(costosExtrasConsulta) || 0;
    const ScostoServiciosGeneral = Number(costosServiciosConsulta) || 0;
    
    const costoTotalGeneral = ScostoExtrasGeneral + ScostoMedicamentosGeneral + ScostoServiciosGeneral;

    const costoTipoGeneral = "CONSULTA GENERAL"

    try{

        const results = await registrarConsultaGeneralModel.registrarConsulta(
            nombrePropietarioConsulta,
            nombreMascotaConsulta,
            pesoMascotaConsulta,
            motivoConsulta,
            medicamentosConsulta, 

            fechaAutomatica,
            idVeterinaria, 
            costosServiciosConsulta,
            costosMedicamentosConsulta,
            costosExtrasConsulta,
            notaCostosConsulta,

            costoTotalGeneral,
            costoTipoGeneral
        );
        return res.redirect('/registrarConsultaGeneral?success=consultaUpdate');

    }catch(error){
        res.redirect('/?error=internalError');
    }
    
}

export default registrarConsultaGeneralController