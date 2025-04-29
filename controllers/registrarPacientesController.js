
import registrarPacintesModel from "../models/registrarPacientesModel.js";

const registrarPacintesController = {}

registrarPacintesController.registrarPropietarios = async (req, res) => {

    const {
        cedulaPropietario,
        nombrePropietario,
        direccionPropietario,
        telefonoPropietario,
        correoPropietario,
        idVeterinaria = req.session.user.id
    } = req.body;

    try{

        const results = await registrarPacintesModel.insertarPropietario(cedulaPropietario,
            nombrePropietario,
            direccionPropietario,
            telefonoPropietario,
            correoPropietario,
            idVeterinaria
        );
        return res.redirect('/registrarPacientes?success=newRegister')
    }catch(error){
        console.log("ERROR:REGISTRO:REGISTRAR: ", error)
        return res.redirect('/registrarPacientes?error=databaseError')
    }
}


registrarPacintesController.registrarMascotas = async (req, res) => {

    try{
        const {
            nombreMascota,tipoMascota,
            pesoMascota, fechaNacimientoMascota,
            edadMascota, razaMascota, castracionMascota,
            colorMascota, partosMascota, fechaPartosMascota,
            sexoMascota, cedulaPropietarioMascota
        } = req.body;


        const ahora = new Date();
        const fechaConsultaMascota = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
        const idVeterinaria  = req.session.user.id;


        const results = await registrarPacintesModel.insertarMascota(
            nombreMascota, tipoMascota, pesoMascota,
            fechaNacimientoMascota, edadMascota,
            razaMascota, castracionMascota, colorMascota,
            partosMascota || null, fechaPartosMascota || null,
            sexoMascota, fechaConsultaMascota,
            idVeterinaria, cedulaPropietarioMascota
        )

        return res.redirect('/registrarPacientes?success=newRegister')

    }catch(error){
        console.log("ERROR:REGISTRO:REGISTRAR: ", error)
        return res.redirect('/registrarPacientes?error=internalError')
    }
    

}

export default registrarPacintesController;