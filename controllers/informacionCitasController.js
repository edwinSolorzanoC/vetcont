
import informacionCitasModel from "../models/informacionCitasModel.js";

const informacionCitasController = {}

informacionCitasController.pedirCitas = async(req,res) => {
    
    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/inicio?error=sesionError');
    }
    const idVeterinaria = req.session.user.id; 
    
    try {
    
        const citas = await informacionCitasModel.mostrarCitas(idVeterinaria)
        res.render('informacionCitas', {datosCitas: citas})
    } catch (error) {
        res.redirect('/?error=internalError');
    }
}


informacionCitasController.buscarCitas = async(req,res) => {
    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/inicio?error=sesionError');
    }
    const idVeterinaria = req.session.user.id; 
    
    
    const  {fechaInicio, fechaFinal} = req.body;
    try {
        
        const resultados = await informacionCitasModel.buscarCita(fechaInicio, fechaFinal, idVeterinaria);
        res.render('informacionCitas', {datosCitas: resultados})
    } catch (error) {
        res.redirect('/?error=internalError');
    }

}
export default informacionCitasController;