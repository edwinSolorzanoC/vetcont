import pool from "../config/conexion.js";

const registrarCitasModel = {};

registrarCitasModel.buscarPaciente = async(cedulaPropietario, idVeterinaria) => {
    
    const peticionDatos = `
    SELECT tb_propietarios_col_nombre, tb_pacientes_col_nombre, tb_pacientes_col_fechaUltimaConsulta
    FROM tb_pacientes 
    JOIN tb_propietarios ON tb_propietarios.tb_propietarios_col_cedula = tb_propietarios_tb_propietarios_col_cedula
    WHERE tb_propietarios_tb_propietarios_col_cedula = ?  AND tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`;


    try {
        const [results] = await pool.execute(peticionDatos, [cedulaPropietario, idVeterinaria]);
        return results;
    } catch (error) {
        res.redirect('/?error=internalError');
    }
}

registrarCitasModel.nuevaCita = async(
    nombrePropietarioCita, nombreMascotaCita, idVeterinaria,

    fechaCita,
    horaCita,
    estadoCita,
    motivoCita
) => {

    const queryDisponibilidad = `
    
    SELECT tb_citas_col_fecha, tb_citas_col_hora
    FROM tb_citas
    WHERE tb_citas_col_fecha = ? AND
    tb_citas_col_hora = ? AND
    tb_citas_col_estado = 1
    ;
    `;
    const queryIds = `
    SELECT tb_propietarios.tb_propietarios_col_cedula, tb_pacientes.idtb_pacientes
    FROM tb_propietarios

    JOIN tb_pacientes
    ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula

    WHERE tb_pacientes.tb_pacientes_col_nombre = ? AND
    tb_propietarios.tb_propietarios_col_nombre = ? AND
    tb_propietarios.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?
    ;`;

    const queryInsertar = `
    INSERT INTO tb_citas(
    tb_propietarios_tb_propietarios_col_cedula,
    tb_pacientes_idtb_pacientes,
    tb_citas_col_fecha,
    tb_citas_col_hora,
    tb_citas_col_estado,
    tb_citas_col_motivo,
    tb_usuariosVeterinaria_idtb_usuariosVeterinaria
    )VALUES(
    ?, ?, ?, ?, ?, ?, ?
    );
    `;

    try {

        const [disponibilidad] = await pool.execute(queryDisponibilidad, [fechaCita, horaCita]);

        if(disponibilidad.length > 0){
            throw new Error('horaNoDisponible');
        }

        const [datosIds] = await pool.execute(queryIds, [nombreMascotaCita, nombrePropietarioCita, idVeterinaria]);

        const idPropietario = datosIds[0].tb_propietarios_col_cedula;
        const idMascota = datosIds[0].idtb_pacientes;


        await pool.execute(queryInsertar, [idPropietario, idMascota, fechaCita, horaCita, estadoCita, motivoCita, idVeterinaria])

    } catch (error) {
        throw error; 
    }
}


export default registrarCitasModel;


