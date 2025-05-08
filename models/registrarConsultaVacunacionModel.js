
import pool from '../config/conexion.js'

const registrarConsultaVacunacionModel = {}



registrarConsultaVacunacionModel.buscarPaciente = async(cedulaPropietario, idVeterinaria) => {
    
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

registrarConsultaVacunacionModel.registrarConsulta = async (
    nombrePropietarioVacunacion,
    nombrePacienteVacunacion, 
    pesoVacunacion,

    nombreInyeccionVacunacion, 
    nombreInyeccionDesparacitacion,
    fechaAutomatica,
    
    idVeterinaria,
    costoServiciosVacunacion,
    costoMedicamentosVacunacion, 
    costoExtrasVacunacion,  
    costoDescripcionVacunacion,
    costoTotalVacunacion,
    costoTipoVacunacion
) => {

    const conecction = await pool.getConnection();

    try{

        await conecction.beginTransaction();

        const verificarExistenciaPacientes = `SELECT  idtb_pacientes
        FROM tb_pacientes
        JOIN tb_propietarios
        ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
        WHERE tb_pacientes_col_nombre = ? AND tb_propietarios_col_nombre = ?;`;


        const [resultsBusqueda] = await conecction.execute(verificarExistenciaPacientes, [
            nombrePacienteVacunacion, 
            nombrePropietarioVacunacion
        ])

        let idMascota = resultsBusqueda.length ? resultsBusqueda[0].idtb_pacientes : null;


        const peticionConsulta = `INSERT INTO tb_consultavacunacion (tb_consultaVacunacion_col_nombrePropietario, 
        tb_consultaVacunacion_col_nombrePaciente, tb_consultaVacunacion_col_actualizacionPeso,
        tb_consultaVacunacion_col_vacunacion, tb_consultaVacunacion_col_desparacitacion,
        tb_consultaVacunacion_col_fecha,tb_usuariosVeterinaria_idtb_usuariosVeterinaria,
        tb_pacientes_idtb_pacientes)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?);`;

        const [results] = await conecction.execute(peticionConsulta, [nombrePropietarioVacunacion,
        nombrePacienteVacunacion, pesoVacunacion,
        nombreInyeccionVacunacion, nombreInyeccionDesparacitacion,
        fechaAutomatica, idVeterinaria, idMascota]);


        const idConsultaVacunacion = results.insertId;
        const idConsultaGeneral = null;
        const insertarCostos = `
        INSERT INTO tb_costosConsultas(
            tb_costosConsultas_col_medicamentos,
            tb_costosConsultas_col_extras, 
            tb_costosConsultas_col_consultal, 
            tb_costosConsultas_col_descripcion,
            tb_costosConsultas_col_total, 
            tb_costosConsultas_col_tipo, 
            tb_consultaGeneral_idtb_consultaGeneral,
            tb_consultaVacunacion_idtb_consultaVacunacion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

        await conecction.execute(insertarCostos, [
            costoMedicamentosVacunacion, 
            costoExtrasVacunacion, 
            costoServiciosVacunacion, 
            costoDescripcionVacunacion,
            costoTotalVacunacion,
            costoTipoVacunacion,
            idConsultaGeneral,
            idConsultaVacunacion
        ]);

        
        await conecction.commit();
        conecction.release();

        return results;


    }catch(error){
        await conecction.rollback();
        conecction.release();
        res.redirect('/?error=internalError');
        
    }

}

export default registrarConsultaVacunacionModel;