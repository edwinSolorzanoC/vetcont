
import inicioModel from "../models/inicioModel.js";


const inicioController = {};

inicioController.peticionIncio = async (req,res) => {

    if (!req.session || !req.session.user || !req.session.user.id) {
        console.log("Erroe en el id")
        return res.redirect('/?error=sesionError');
    }
    const idVeterinaria = req.session.user.id;
    const fechaAutomatica = new Date().toISOString().slice(0, 10); // Formato: YYYY-MM-DD,

    try {
        
        const citasdeHoy = await inicioModel.inicio(idVeterinaria, fechaAutomatica);
        res.render('inicio', {citas:citasdeHoy})
        
    } catch (error) {
        console.log("Error en el controller de inicio", error)
    }
}

export default inicioController;