
document.addEventListener('DOMContentLoaded', function(){

    document.querySelectorAll("#tabla_pacientes tr").forEach((fila, index) => {
        
        fila.addEventListener('click', function(){

            console.log("Fila clickeada:", fila);

            const nombrePropietario = fila.cells[0].textContent;
            const nombreMascota =  fila.cells[1].textContent;


            fetch('/datosMascota', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombrePropietario, nombreMascota})
            }).then(response => response.json()).then(datos => {
                
                console.log("DATOS AJAX", datos)
                const paciente = datos.datosPaciente[0] || {};
                mostrarPropietario(paciente);
                mostrarDatosPaciente(paciente);


                const tablaConsultas = document.getElementById('tabla_informacionConsultas').querySelector('tbody');
                tablaConsultas.innerHTML = "";  // Limpiar la tabla

                datos.consultasGenerales.forEach(item => {
                    const nuevaFila = tablaConsultas.insertRow();
                    nuevaFila.insertCell(0).textContent = formatearFecha(item.tb_consultaGeneral_col_fecha);
                    nuevaFila.insertCell(1).textContent = item.tb_consultaGeneral_col_motivo;
                    nuevaFila.insertCell(2).textContent = item.tb_consultaGeneral_col_medicamentosUtilizados;
                    nuevaFila.insertCell(3).textContent = item.tb_consultaGeneral_col_actualizacionPeso + "Kg";
                    nuevaFila.insertCell(4).textContent = "CRC " + item.tb_costosConsultas_col_total;
                });

                const tablaVacunacion = document.getElementById('tablaInformacionvacunacion').querySelector('tbody');
                tablaVacunacion.innerHTML = "";  // Limpiar la tabla

                datos.vacunacion.forEach(item => {
                    const nuevaFila = tablaVacunacion.insertRow();
                    nuevaFila.insertCell(0).textContent = formatearFecha(item.tb_consultaVacunacion_col_fecha);
                    nuevaFila.insertCell(1).textContent = item.tb_consultaVacunacion_col_desparacitacion;
                    nuevaFila.insertCell(2).textContent = item.tb_consultaVacunacion_col_vacunacion;
                    nuevaFila.insertCell(3).textContent = item.tb_consultaVacunacion_col_actualizacionPeso + "Kg";
                    nuevaFila.insertCell(4).textContent = "CRC " + item.tb_costosConsultas_col_total;
                });

            })
        })
    })

    function mostrarPropietario(p) {
        document.getElementById("nombrePropietarioTabla").textContent = p.tb_propietarios_col_nombre || "No disponible";
        document.getElementById("numeroIdentidadPropietarioTabla").textContent = p.tb_propietarios_col_cedula || "No disponible";
        document.getElementById("direccionPropietarioTabla").textContent = p.tb_propietarios_col_direccion || "No disponible";
        document.getElementById("telefonoPropietarioTabla").textContent = p.tb_propietarios_col_numeroTelefono || "No disponible";
        document.getElementById("correoElectronicoPropietarioTabla").textContent = p.tb_propietarios_col_correoElectronico || "No disponible";
    }
    
    function mostrarDatosPaciente(p) {
        document.getElementById("nombreMascota").textContent = p.tb_pacientes_col_nombre || "No disponible";
        document.getElementById("tipoMascota").textContent = p.tb_pacientes_col_tipo || "No disponible";
        document.getElementById("razaMascota").textContent = p.tb_pacientes_col_raza || "No disponible";
    
        document.getElementById("fechaNacimientoMascota").textContent = p.tb_pacientes_col_fechaNacimiento 
            ? new Date(p.tb_pacientes_col_fechaNacimiento).toLocaleDateString('es-ES')
            : "No disponible";
    
        document.getElementById("SexoMascota").textContent = p.tb_pacientes_col_sexo || "No disponible";
        document.getElementById("colorMascota").textContent = p.tb_pacientes_col_color || "No disponible";
    
        document.getElementById("castracionMascota").textContent = p.tb_pacientes_col_castrado === "1" 
            ? "Sí" 
            : p.tb_pacientes_col_castrado === "2" 
                ? "No" 
                : "No disponible";
    
        document.getElementById("edadMascota").textContent = p.tb_pacientes_col_edad ? `${p.tb_pacientes_col_edad} Años` : "No disponible";

        document.getElementById("cantidadPartosMascota").textContent = p.tb_pacientes_col_cantidadPartos || "No disponible";
    
        document.getElementById("fechaUltimoPartoMascota").textContent = p.tb_pacientes_col_fechaUltimoParto 
            ? new Date(p.tb_pacientes_col_fechaUltimoParto).toLocaleDateString('es-ES')
            : "No disponible";
    
        document.getElementById("pesoMascota").textContent = p.tb_pacientes_col_peso 
            ? `${p.tb_pacientes_col_peso} kg` 
            : "No disponible";
    
        document.getElementById("fechaUltimaConsultaMascota").textContent = p.tb_pacientes_col_fechaUltimaConsulta 
            ? new Date(p.tb_pacientes_col_fechaUltimaConsulta).toLocaleDateString('es-ES')
            : "No disponible";
    }

    function formatearFecha(fechaISO) {
        // Convierte la fecha en un objeto Date
        if (!fechaISO) {
            return ""; // Retorna una cadena vacía si no hay dato
        }
    
        // Convierte la fecha en un objeto Date
        const fecha = new Date(fechaISO);
    
        // Verifica si la fecha es inválida
        if (isNaN(fecha)) {
            return ""; // Retorna una cadena vacía si la fecha no es válida
        }
    
        // Extrae el día, mes y año
        const dia = fecha.getDate().toString().padStart(2, '0'); // Asegura que tenga dos dígitos
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan en 0
        const anio = fecha.getFullYear();
    
        // Retorna en el formato deseado (dd/mm/yyyy)
        return `${dia}/${mes}/${anio}`;
    }
    
    

    
});