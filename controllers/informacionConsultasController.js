
import informacionConsultasModel from '../models/informacionConsultasModels.js'

const informacionConsultasController = {};


informacionConsultasController.inicioConsultas = async (req, res) => {
    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/inicio?error=sesionError');
    }
    const idVeterinaria = req.session.user.id; 

    try{
        const results = await informacionConsultasModel.peticionConsultas(idVeterinaria)
        
        res.render("informacionConsultas", {
            datosConsultaGeneral: results.resultsConsultaGeneral,
            datosConsultaVacunacion: results.resultsConsultaVacunacion,
        });

    }catch(error){
        console.log("ERROR:CONSULTAS:START: ", error)
        res.redirect('/inicio?error=internalError');
    }
};

informacionConsultasController.costos = async(req,res) => {

    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/inicio?error=sesionError');
    }

    const idConsulta = req.body.idConsulta;
    try {

        const resultado = await informacionConsultasModel.consultarCostos(idConsulta);
        return res.json(resultado);
    
    } catch (error) {
        console.log("Error en el controller de costos: ", error)   
    }
}



export default informacionConsultasController;