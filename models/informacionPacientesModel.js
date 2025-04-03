
import pool from '../config/conexion.js'

const informacionPacientesModel = {}


informacionPacientesModel.buscarPaciente = async(cedulaPropietario, idVeterinaria) => {
    
    const peticionDatos = `
    SELECT tb_propietarios_col_nombre, tb_pacientes_col_nombre, tb_pacientes_col_fechaUltimaConsulta
    FROM tb_pacientes 
    JOIN tb_propietarios ON tb_propietarios.tb_propietarios_col_cedula = tb_propietarios_tb_propietarios_col_cedula
    WHERE tb_propietarios_tb_propietarios_col_cedula = ?  AND tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`;


    try {
        const [results] = await pool.execute(peticionDatos, [cedulaPropietario, idVeterinaria]);
        return results;
    } catch (error) {
        console.log("ERROR:M:INFOPACIENTES:CONSULTA: ", error)
        res.redirect('/?error=internalError');
    }
}



export default informacionPacientesModel;