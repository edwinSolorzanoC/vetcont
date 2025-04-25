
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


informacionPacientesModel.obtenerDatosMascota = async (idVeterinaria,nombreMascota,nombrePropietario) => {

    try{

        const peticionDatosUnicos = `  
        SELECT tb_pacientes_col_nombre, 
        tb_pacientes_col_tipo, 
        tb_pacientes_col_raza,  
        tb_pacientes_col_fechaNacimiento,
        tb_pacientes_col_sexo,
        tb_pacientes_col_color,
        tb_pacientes_col_castrado,
        tb_pacientes_col_edad,
        tb_partos_col_cantidad,
        tb_partos_col_fechaParto,
        tb_pacientes_col_peso,
        tb_pacientes_col_fechaUltimaConsulta,
        tb_propietarios_col_nombre,
        tb_propietarios_col_cedula,
        tb_propietarios_col_direccion,
        tb_propietarios_col_numeroTelefono,
        tb_propietarios_col_correoElectronico
        FROM tb_pacientes
        JOIN tb_propietarios 
        ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
        LEFT JOIN tb_partos
        ON tb_pacientes.idtb_pacientes = tb_partos.tb_pacientes_idtb_pacientes
        WHERE 
        tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? AND
        tb_pacientes_col_nombre = ? AND
        tb_propietarios_col_nombre = ? ;`
        

        const peticionDatosConsultaGeneral = `SELECT 
        tb_consultaGeneral_col_fecha, 
        tb_consultaGeneral_col_motivo, 
        tb_consultaGeneral_col_medicamentosUtilizados,
        tb_costosConsultas_col_total
    
        FROM tb_consultageneral
    
        JOIN tb_pacientes 
        ON tb_pacientes.idtb_pacientes = tb_consultageneral.tb_pacientes_idtb_pacientes
    
        JOIN tb_propietarios
        ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula

        JOIN tb_costosConsultas
        ON tb_consultageneral.idtb_consultaGeneral = tb_consultaGeneral_idtb_consultaGeneral
    
        WHERE 
        tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? AND
        tb_pacientes_col_nombre = ? AND
        tb_propietarios_col_nombre = ? ;`
            

        const peticionVacunacion = `SELECT 
        tb_consultaVacunacion_col_fecha,
        tb_consultaVacunacion_col_desparacitacion,
        tb_consultaVacunacion_col_vacunacion,
        tb_costosConsultas_col_total
        
        FROM tb_consultavacunacion
        
        JOIN tb_pacientes 
        ON tb_pacientes.idtb_pacientes = tb_consultavacunacion.tb_pacientes_idtb_pacientes
        
        JOIN tb_propietarios
        ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula

        JOIN tb_costosConsultas
        ON tb_consultavacunacion.idtb_consultaVacunacion = tb_consultaVacunacion_idtb_consultaVacunacion
        
        WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?
        AND tb_pacientes.tb_pacientes_col_nombre = ?
        AND tb_propietarios.tb_propietarios_col_nombre = ?;`
        

        const [datosPaciente] = await pool.execute(peticionDatosUnicos, [idVeterinaria, nombreMascota, nombrePropietario])
        const [consultasGenerales] = await pool.execute(peticionDatosConsultaGeneral, [idVeterinaria, nombreMascota, nombrePropietario])
        const [vacunacion] = await pool.execute(peticionVacunacion, [idVeterinaria, nombreMascota, nombrePropietario])


        return{
            datosPaciente,
            consultasGenerales,
            vacunacion
        }

    }catch(error){
        console.log("ERROR:M:PERFIL:GETDATES: ", error)
        res.redirect('/?error=internalError');
    }

}



export default informacionPacientesModel;