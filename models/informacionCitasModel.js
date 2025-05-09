
import pool from '../config/conexion.js'


const informacionCitasModel = {}

informacionCitasModel.mostrarCitas = async(idVeterinaria) => {

    const query = `
    
    SELECT idtb_citas,
    tb_propietarios.tb_propietarios_col_cedula,
    tb_propietarios.tb_propietarios_col_nombre,
    tb_pacientes.idtb_pacientes,
    tb_pacientes.tb_pacientes_col_nombre,
    tb_citas_col_fecha,
    tb_citas_col_hora,
    tb_citas_col_estado,
    tb_citas_col_motivo
    FROM tb_citas

    JOIN tb_propietarios
    ON tb_citas.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula

    JOIN tb_pacientes 
    ON tb_citas.tb_pacientes_idtb_pacientes = tb_pacientes.idtb_pacientes

    WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?
    ;
    `;

    try {

        const [resultados] = await pool.execute(query, [idVeterinaria]);
        return resultados;
        
    } catch (error) {
        res.redirect('/?error=internalError');
    }
}

informacionCitasModel.buscarCita = async(fechaInicio, fechaFinal, idVeterinaria) => {

    const query =  `
    SELECT 
    idtb_citas,
    tb_propietarios.tb_propietarios_col_cedula,
    tb_propietarios.tb_propietarios_col_nombre,
    tb_pacientes.idtb_pacientes,
    tb_pacientes.tb_pacientes_col_nombre,
    tb_citas_col_fecha,
    tb_citas_col_hora,
    tb_citas_col_estado,
    tb_citas_col_motivo

    FROM tb_citas

    JOIN tb_propietarios
    ON tb_citas.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula

    JOIN tb_pacientes 
    ON tb_citas.tb_pacientes_idtb_pacientes = tb_pacientes.idtb_pacientes

    WHERE tb_citas_col_fecha BETWEEN ? AND ?
    AND tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;
    `;
    try {

        const [resultados] = await pool.execute(query, [fechaInicio, fechaFinal, idVeterinaria])
        return resultados

    } catch (error) {
        res.redirect('/?error=internalError');
    }
}

export default informacionCitasModel;

