

import pool from '../config/conexion.js'

const informacionConsultasModel = {};


informacionConsultasModel.peticionConsultas = async(idVeterinaria) => {
    try {
        const peticionConsultasGenerales = `
        SELECT 
        tb_consultaGeneral_col_fecha, tb_consultaGeneral_col_nombrePropietario,
        tb_consultaGeneral_col_nombrePaciente, tb_consultaGeneral_col_motivo,
        tb_consultaGeneral_col_medicamentosUtilizados, tb_consultaGeneral_col_actualizacionPeso,
        tb_costosConsultas_col_total

        FROM tb_consultageneral

        JOIN tb_costosConsultas
        ON tb_consultageneral.idtb_consultaGeneral = tb_consultaGeneral_idtb_consultaGeneral

        WHERE tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?
        ORDER BY 
        tb_consultaGeneral_col_fecha DESC; `;


        const peticionConsultasVacunacion =   `
        SELECT 
        tb_consultaVacunacion_col_fecha, tb_consultaVacunacion_col_nombrePaciente,
        tb_consultaVacunacion_col_nombrePropietario, tb_consultaVacunacion_col_vacunacion, 
        tb_consultaVacunacion_col_desparacitacion, tb_consultaVacunacion_col_actualizacionPeso
        ,tb_costosConsultas_col_total

        FROM tb_consultavacunacion
        
        JOIN tb_costosConsultas
        ON tb_consultavacunacion.idtb_consultaVacunacion = tb_consultaVacunacion_idtb_consultaVacunacion
        
        
        WHERE tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?
        ORDER BY tb_consultaVacunacion_col_fecha DESC;`;

        const [resultsConsultaGeneral] = await pool.execute(peticionConsultasGenerales, [idVeterinaria])
        const [resultsConsultaVacunacion] = await pool.execute(peticionConsultasVacunacion, [idVeterinaria])

        return{
            resultsConsultaGeneral, resultsConsultaVacunacion
        }


    } catch (error) {
        console.log("ERROR:M:CONSULTAS:START: ", error)
        res.redirect('/inicio?error=internalError');
    }
}

export default informacionConsultasModel;