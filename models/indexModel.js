
import pool from "../config/conexion.js";

const indexModel = {};


indexModel.crearUsuario = async (nombreUsuario, nombreSistema,
    password, correoElectronico,
    numeroTelefono, direccion,
    claveSeguridad
    ) => {
        const crearUsuario = `UPDATE tb_usuariosveterinaria
        SET
        tb_usuariosVeterinaria_col_nombre = ?,
        tb_usuariosVeterinaria_col_usuario = ?,
        tb_usuariosVeterinaria_col_contrasenna = ?,
        tb_usuariosVeterinaria_col_correoElectronico = ?,
        tb_usuariosVeterinaria_col_numeroTelefono = ?,
        tb_usuariosVeterinaria_col_direccion = ?
        WHERE tb_usuariosVeterinaria_col_claveSeguraidad = ?;
        `;
  
        try{
            const [results] = await pool.execute(crearUsuario, [nombreUsuario,
            nombreSistema, password,
            correoElectronico, numeroTelefono,
            direccion, claveSeguridad]);
    
            if(results.affectedRows === 0){
                return {error: "invalidKey"}
            }
            return results
        }catch(error){
            console.log("ERROR:M:INDEX:SINGIN: ", error)
            res.redirect('/?error=internalError');
        }
    };


    
// Método para consultar un usuario por su nombre de usuario
indexModel.consultaBaseDatos = async (username) => {

    const query = `
    SELECT 
    idtb_usuariosVeterinaria, 
    tb_usuariosVeterinaria_col_usuario, 
    tb_usuariosVeterinaria_col_contrasenna,
    tb_usuariosVeterinaria_col_estado
    
    FROM tb_usuariosveterinaria
    
    WHERE tb_usuariosVeterinaria_col_usuario = ?;`;
    
    try {
      const [results] = await pool.execute(query, [username]);
      return results;
  
    } catch (error) {
      console.log("ERROR:M:INDEX:START: ", error)
      res.redirect('/?error=internalError');
    }
  
  };


    indexModel.actualizarContrasenna = async (claveSeguridad, hashedPassword) => {
    const queryActualizar = `UPDATE tb_usuariosveterinaria
    SET tb_usuariosVeterinaria_col_contrasenna = ?
    WHERE tb_usuariosVeterinaria_col_claveSeguraidad = ?    `;

    try{

      const [results] = await pool.execute(queryActualizar, [hashedPassword, claveSeguridad]);

          // Si no se actualizó ninguna fila, significa que la clave de seguridad no coincide
        if (results.affectedRows === 0) {
            return { error: "userpassNotFound" };
        }
        
      return results

    }catch(error){
      console.log("ERROR:M:INDEX:UPDATEPASS: ", error)
      res.redirect('/?error=internalError');
    }
};

  
export default indexModel;
