
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
        res.redirect('/inicio?error=internalError');
    }
};

informacionConsultasController.costos = async(req,res) => {

    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/inicio?error=sesionError');
    }

    const idConsulta = req.body.idConsulta;
    const descripcion = req.body.descripcion;
    try {

        if(descripcion === "Consulta de control"){
            const resultado = await informacionConsultasModel.consultarCostosVacunacion(idConsulta);
            return res.json(resultado);
        }
        const resultado = await informacionConsultasModel.consultarCostos(idConsulta);
        return res.json(resultado);
    
    } catch (error) {
        console.log("Error ajax json", error)
        res.redirect('/?error=internalError');
    }
}



export default informacionConsultasController;