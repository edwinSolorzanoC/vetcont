import indexModel from '../models/indexModel.js';
import bcrypt from 'bcryptjs';

const indexController = {};

indexController.crearUsuario = async (req, res) => {
    const {
        nombreUsuario, nombreSistema,
        password, correoElectronico,
        numeroTelefono, direccion,
        claveSeguridad,} = req.body;

    // Validaciones de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
        // contraseña no validad
        return res.redirect('/?error=invalidPassword');
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const results = await indexModel.crearUsuario(nombreUsuario, nombreSistema,
            hashedPassword, correoElectronico,
            numeroTelefono, direccion,
            claveSeguridad
        );
        if(results.error === "invalidKey"){
            // clave de seguridad incorrcta
            return res.redirect('/?error=invalidKey')
        }
        // usuario creado exitosamente
        return res.redirect('/?success=userCreated')
    }catch(error){
        console.log("Error interno", error)
        //Error interno
        return res.redirect('/?success=internalError')
    }
};



indexController.iniciarSesion = async (req, res) => {
    
    const { username, password } = req.body;

    try {
        // Llamada al modelo para consultar el usuario
        const results = await indexModel.consultaBaseDatos(username);

        if (results.length > 0) {
            const usuario = results[0];

            // Comparar la contraseña en texto plano con la encriptada en la base de datos
            const isMatch = await bcrypt.compare(password, usuario.tb_usuariosVeterinaria_col_contrasenna);
            
            if (isMatch) {
                
                req.session.user = {
                    id: usuario.idtb_usuariosVeterinaria,
                    estado: usuario.tb_usuariosVeterinaria_col_estado
                };

                // Inicio de sesión exitoso
                return res.redirect('/inicio?success=loginSuccess');
                
            } else {
                // Contraseña incorrecta
                return res.redirect('/?error=incorrectPassword');
            }
        } else {
            // Usuario no encontrado
            return res.redirect('/?error=userNotFound');
        }
    } catch (error) {
            console.log("Error interno", error)

        // Manejo de errores en el controlador
        return res.redirect('/?error=internalError');
    }
};

indexController.reestablecerContrasenna = async (req, res) => {
    const {claveSeguridad, password, secondPassword} = req.body

    
    if (password !== secondPassword) {
        return res.redirect('/?error=noCoincidencias');
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.redirect('/?error=invalidPassword');
    }

    try{

        const hashedPassword = await bcrypt.hash(password, 10);
        const results = await indexModel.actualizarContrasenna(claveSeguridad, hashedPassword);

        if (results.error === "userpassNotFound") {
            return res.redirect('/?error=invalidKey');
        }   


        //contraseña actualizada
        return res.redirect("/?success=passUpdate");  
    }catch(error){
        console.log("ERROR:INDEX:UPDATEPASS: ", error);
        return res.redirect('/?success=internalError')
    }

}



export default indexController;