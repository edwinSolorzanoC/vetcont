import pool from '../config/conexion.js'

const registrarConsultaGeneralModel = {}

registrarConsultaGeneralModel.buscarPaciente = async(cedulaPropietario, idVeterinaria) => {
    
    const peticionDatos = `
    SELECT tb_propietarios_col_nombre, tb_pacientes_col_nombre, tb_pacientes_col_fechaUltimaConsulta
    FROM tb_pacientes 
    JOIN tb_propietarios ON tb_propietarios.tb_propietarios_col_cedula = tb_propietarios_tb_propietarios_col_cedula
    WHERE tb_propietarios_tb_propietarios_col_cedula = ?  AND tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`;


    try {
        const [results] = await pool.execute(peticionDatos, [cedulaPropietario, idVeterinaria]);
        return results;
    } catch (error) {
        console.log("ERROR:M:REGISTRARCONSGENERAL:BUSCARP: ", error)
        res.redirect('/?error=internalError');
    }
}


registrarConsultaGeneralModel.registrarConsulta = async (
    nombrePropietarioConsulta,
    nombreMascotaConsulta, 
    pesoMascotaConsulta,
    motivoConsulta, 
    medicamentosConsulta,

    fechaAutomatica, 
    idVeterinaria, 

    costosServiciosConsulta, 
    costosMedicamentosConsulta, 
    costosExtrasConsulta, 
    notaCostosConsulta,

    costoTotalGeneral,
    costoTipoGeneral
) => {

    const conecction = await pool.getConnection();

    try{

        await conecction.beginTransaction();

        const verificarExistenciaPacientes = `
        SELECT idtb_pacientes
        FROM tb_pacientes
        JOIN tb_propietarios
        ON tb_propietarios.tb_propietarios_col_cedula = tb_pacientes.tb_propietarios_tb_propietarios_col_cedula
        WHERE tb_pacientes_col_nombre = ? AND tb_propietarios_col_nombre = ?;`;

        
        const [resultsBusqueda] = await conecction.execute(verificarExistenciaPacientes, [
            nombreMascotaConsulta,
            nombrePropietarioConsulta
        ]);


        let idMascota = resultsBusqueda.length ? resultsBusqueda[0].idtb_pacientes : null;

        const peticionConsulta = `
            INSERT INTO tb_consultageneral (
                tb_consultaGeneral_col_nombrePropietario, 
                tb_consultaGeneral_col_nombrePaciente,
                tb_consultaGeneral_col_motivo, 
                tb_consultaGeneral_col_medicamentosUtilizados, 
                tb_consultaGeneral_col_actualizacionPeso,
                tb_consultaGeneral_col_fecha, 
                tb_usuariosVeterinaria_idtb_usuariosVeterinaria,
                tb_pacientes_idtb_pacientes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

            

        const [resultsConsulta] = await conecction.execute(peticionConsulta, [
            nombrePropietarioConsulta, 
            nombreMascotaConsulta, 
            motivoConsulta,
            medicamentosConsulta, 
            pesoMascotaConsulta, 
            fechaAutomatica, 
            idVeterinaria, 
            idMascota
        ]);

        const idConsultaGeneral = resultsConsulta.insertId; // Obtener el ID de la consulta recién insertada
        const idConsultaVacunacion = null;
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
            costosMedicamentosConsulta, 
            costosExtrasConsulta, 
            costosServiciosConsulta, 
            notaCostosConsulta, 
            costoTotalGeneral, 
            costoTipoGeneral,
            idConsultaGeneral,
            idConsultaVacunacion
        ]);


        await conecction.commit();
        conecction.release();

        return resultsConsulta;


    }catch(error){
       await conecction.rollback();
        conecction.release();
        console.log("ERROR:M:REGISTRARCONSULTAS:INSERTAR: ", error)
        res.redirect('/?error=internalError');

    }

};


export default registrarConsultaGeneralModel;