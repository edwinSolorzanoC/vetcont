

import pool from '../config/conexion.js'

const inicioModel = {}

inicioModel.inicio = async(idVeterinaria, fechaAutomatica) => {
    const queryCitas = `
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

    WHERE tb_citas.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? AND
    tb_citas_col_estado = 1 AND
    tb_citas_col_fecha = ?;
    ;
    `;

    try {
        await pool.execute(queryCitas,[idVeterinaria, fechaAutomatica])
    } catch (error) {
        console.log("Error en el model de incio", error)
    }
}

export default inicioModel;