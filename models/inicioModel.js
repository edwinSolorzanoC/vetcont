

import pool from '../config/conexion.js'

const inicioModel = {}

inicioModel.inicio = async(idVeterinaria, fechaAutomatica) => {
    const queryCitas = `
    SELECT idtb_citas,
     tb_propietarios.tb_propietarios_col_cedula,
    tb_propietarios.tb_propietarios_col_nombre,
    tb_citas_col_propietarioNombre,
    tb_pacientes.idtb_pacientes,
    tb_pacientes.tb_pacientes_col_nombre,
    tb_citas_col_mascotaNombre,
    tb_citas_col_fecha,
    tb_citas_col_hora,
    tb_citas_col_estado,
    tb_citas_col_motivo
    FROM tb_citas

    LEFT JOIN tb_propietarios
    ON tb_citas.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula

    LEFT JOIN tb_pacientes 
    ON tb_citas.tb_pacientes_idtb_pacientes = tb_pacientes.idtb_pacientes

    WHERE tb_citas.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? AND
    tb_citas_col_estado = 1 AND
    tb_citas_col_fecha = ?;
    ;
    `;

    const queryConsultasGenerales = `
    SELECT idtb_consultaGeneral, tb_consultaGeneral_col_nombrePropietario, tb_consultaGeneral_col_nombrePaciente,
    tb_consultaGeneral_col_motivo,
    tb_consultaGeneral_col_medicamentosUtilizados,
    tb_costosConsultas_col_total
    
    FROM tb_consultageneral
    
    JOIN tb_costosConsultas
    ON tb_consultageneral.idtb_consultaGeneral = tb_costosConsultas.tb_consultaGeneral_idtb_consultaGeneral
    
    WHERE tb_consultaGeneral_col_fecha = ? AND tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?; 
    `;

    const queryConsultasVacunacion = `
   
    SELECT idtb_consultaVacunacion, tb_consultaVacunacion_col_nombrePropietario, tb_consultaVacunacion_col_nombrePaciente,
    tb_consultaVacunacion_col_vacunacion, tb_consultaVacunacion_col_desparacitacion, tb_costosConsultas_col_total
    
    FROM tb_consultavacunacion

    JOIN tb_costosConsultas
    ON tb_consultavacunacion.idtb_consultaVacunacion = tb_costosConsultas.tb_consultaVacunacion_idtb_consultaVacunacion

    WHERE tb_consultaVacunacion_col_fecha = ? AND tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;
    `;

    try {
        const [resultadosCitas] = await pool.execute(queryCitas,[idVeterinaria, fechaAutomatica]);
        const [resultadosGeneral] = await pool.execute(queryConsultasGenerales, [fechaAutomatica, idVeterinaria]);
        const [resultadosVacunacion] = await pool.execute(queryConsultasVacunacion, [fechaAutomatica, idVeterinaria]);


        return {
            citas: resultadosCitas,
            consultasGenerales: resultadosGeneral,
            consultasVacunacion: resultadosVacunacion
        };
        
    } catch (error) {
        console.log("Error interno", error)
        res.redirect('/?error=internalError');
    }
}

inicioModel.finalizarCita = async (idCita) => {
   
    const query = `
    UPDATE tb_citas
    SET tb_citas_col_estado = 0
    WHERE idtb_citas = ?; 
    `;

    try {
      
        await pool.execute(query, [idCita])

    } catch (error) {
        console.log("Error interno", error)
        res.redirect('/?error=internalError');
    }
}


inicioModel.cancelarCita = async (idCita) => {
   
    const query = `
    UPDATE tb_citas
    SET tb_citas_col_estado = 3
    WHERE idtb_citas = ?; 
    `;

    try {
      
        await pool.execute(query, [idCita])

    } catch (error) {
        console.log("Error interno", error)
        res.redirect('/?error=internalError');
    }
}


inicioModel.reprogramarCita = async (
    idCitaFormulario,
    nuevaFechaRprogramada,
    nuevaHoraReprogramada,
    descripcionReprogramada) => {

    const query = `
    UPDATE tb_citas
    SET tb_citas_col_estado = 1,
    tb_citas_col_motivo = ?,
    tb_citas_col_fecha = ?,
    tb_citas_col_hora = ?
    WHERE idtb_citas = ?; 
    `;


    try {
      
        await pool.execute(query, [
        descripcionReprogramada,
        nuevaFechaRprogramada,
        nuevaHoraReprogramada,
        idCitaFormulario,
        ])

    } catch (error) {
        console.log("Error interno", error)
    }
}

export default inicioModel;