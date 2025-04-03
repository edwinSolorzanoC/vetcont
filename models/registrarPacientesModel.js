
import pool from '../config/conexion.js'

const registrarPacintesModel = {}


registrarPacintesModel.insertarPropietario = async (cedulaPropietario, nombrePropietario, 
    direccionPropietario, telefonoPropietario, correoPropietario, idVeterinaria) => {
        
        const peticion = `INSERT INTO tb_propietarios 
        (tb_propietarios_col_cedula, tb_propietarios_col_nombre, tb_propietarios_col_direccion, tb_propietarios_col_numeroTelefono, 
        tb_propietarios_col_correoElectronico, tb_usuariosVeterinaria_idtb_usuariosVeterinaria) 
        VALUES (?, ?, ?, ?, ?, ?)`;

        try{
            const [results] = await pool.execute(peticion, [cedulaPropietario, nombrePropietario,
                direccionPropietario, telefonoPropietario, correoPropietario, idVeterinaria
            ])
            return results

        }catch(error){
            console.log("ERROR:M:REGISTRO:INSERT: ", error)
            res.redirect('/?error=internalError');
        }

}


registrarPacintesModel.insertarMascota = async (nombreMascota, tipoMascota, pesoMascota, 
    fechaNacimientoMascota, edadMascota,razaMascota,castracionMascota, 
    colorMascota, partosMascota, fechaPartosMascota, sexoMascota,
    fechaConsultaMascota, idVeterinaria, cedulaPropietarioMascota) => {


        const conecction = await pool.getConnection();

        try{

            await conecction.beginTransaction();
            const peticionMascota = `INSERT INTO tb_pacientes 
            (tb_pacientes_col_nombre, tb_pacientes_col_tipo, tb_pacientes_col_peso, 
            tb_pacientes_col_fechaNacimiento, tb_pacientes_col_edad, tb_pacientes_col_raza, 
            tb_pacientes_col_castrado, tb_pacientes_col_color, tb_pacientes_col_sexo, 
            tb_pacientes_col_fechaUltimaConsulta, tb_usuariosVeterinaria_idtb_usuariosVeterinaria, 
            tb_propietarios_tb_propietarios_col_cedula) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const [results] = await pool.execute(peticionMascota, [
            nombreMascota, tipoMascota, pesoMascota, fechaNacimientoMascota, 
            edadMascota, razaMascota, castracionMascota, colorMascota, 
            sexoMascota, fechaConsultaMascota, idVeterinaria, cedulaPropietarioMascota
            ]);

            const idMascota = results.insertId; // Obtener el ID de la mascota recién insertada

            if(partosMascota && fechaPartosMascota){
                const peticionPartos = `INSERT INTO tb_partos
                (tb_partos_col_numeroParto, tb_partos_col_fechaParto, tb_partos_col_cantidad, tb_pacientes_idtb_pacientes)
                VALUES (?, ?, ?, ?)`;

                await conecction.execute(peticionPartos, [partosMascota, fechaPartosMascota, partosMascota, idMascota])
            }

            await conecction.commit();
            conecction.release();

            return results

        }catch(error){
            await conecction.rollback();
            conecction.release();
            console.log("ERROR:M:REGISTRO:INSERT: ", error)
            res.redirect('/?error=internalError');

        }

}

export default registrarPacintesModel;
