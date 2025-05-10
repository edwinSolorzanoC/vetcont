
document.addEventListener('DOMContentLoaded', function(){

    const mostrarConsultasGenerales = document.getElementById("btn_consultasGenerales");
    const mostrarConsultasVacunacion = document.getElementById("btn_consultasVacunacion");

    const consultasVacunacion = document.getElementById("consultasVacunacion");
    const consultasGenerales = document.getElementById("consultasGenerales");


    mostrarConsultasVacunacion.addEventListener('click', function(){
        consultasGenerales.style.display = 'none'
        consultasVacunacion.style.display = 'block'

    });

    mostrarConsultasGenerales.addEventListener('click', function(){
        consultasVacunacion.style.display = 'none'
        consultasGenerales.style.display = 'block'

    })


    const pantalla = document.getElementById("pantallaFlotante");

    function mostrarPantalla(
        nombrePropietario, 
        nombreMascota,
        costoConsulta,
        costoMedicamentos,
        costoExtras,
        costoDescripcion,
        costoTotal,
        fechaConsulta) {
        pantalla.style.display = 'block'
        
        const tablaCostos = document.getElementById('tablaPantalla').querySelector('tbody');
        tablaCostos.innerHTML = "";  // Limpiar la tabla

        
        const nuevaFila = tablaCostos.insertRow();
        nuevaFila.insertCell(0).textContent = (nombrePropietario);
        nuevaFila.insertCell(1).textContent = (nombreMascota);
        nuevaFila.insertCell(2).textContent = (fechaConsulta);
        nuevaFila.insertCell(3).textContent = "₡ " +(costoConsulta);
        nuevaFila.insertCell(4).textContent = "₡ " +(costoMedicamentos);
        nuevaFila.insertCell(5).textContent = "₡ " +(costoExtras);
        nuevaFila.insertCell(6).textContent = (costoDescripcion);
        nuevaFila.insertCell(7).textContent = "₡ " +(costoTotal);

    }

    document.getElementById("cerraVentana").addEventListener('click', function(){
        pantalla.style.display = 'none'

    })






    const tabla = document.getElementById('tablaConsultasGenerales');
    let filaSeleccionada = null; // Para almacenar la fila seleccionada
    const menu = document.getElementById('menu');


    // Mostrar el menú contextual al hacer clic derecho en una fila
    tabla.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Evitar el menú contextual por defecto

        // Verificar si se hizo clic en una fila de la tabla (no en las celdas)
        if (e.target.tagName === 'TD') {
            // Obtener la fila en la que se hizo clic
            filaSeleccionada = e.target.closest('tr');

            // Obtener las coordenadas del clic
            const mouseX = e.pageX;
            const mouseY = e.pageY;

            // Mostrar el menú en las coordenadas del clic
            menu.style.display = 'block';
            menu.style.left = `${mouseX}px`;
            menu.style.top = `${mouseY}px`;
        }
    });


    // Ocultar el menú cuando se hace clic en cualquier parte de la página
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target.tagName !== 'TD') {
            menu.style.display = 'none';
        }
    });


    document.getElementById('opcion1').addEventListener('click', () => {
        if (filaSeleccionada) {
            const idConsulta = filaSeleccionada.cells[0].textContent;
            const nombrePropietario = filaSeleccionada.cells[1].textContent;
            const nombreMascota = filaSeleccionada.cells[2].textContent;
            const fechaConsulta = filaSeleccionada.cells[6].textContent;



            fetch('/consultarCostos', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idConsulta})
            }).then(response => response.json()).then(resultado => {
                console.log("Datos recividos: ", resultado);

                if (resultado.length > 0) {
                    const costoMedicamentos = resultado[0].tb_costosConsultas_col_medicamentos;
                    const costoConsulta = resultado[0].tb_costosConsultas_col_consultal;
                    const costoExtras = resultado[0].tb_costosConsultas_col_extras;
                    const costoTotal = resultado[0].tb_costosConsultas_col_total;
                    const costoDescripcion = resultado[0].tb_costosConsultas_col_descripcion;

                    mostrarPantalla(
                        nombrePropietario, 
                        nombreMascota,
                        costoConsulta,
                        costoMedicamentos,
                        costoExtras,
                        costoDescripcion,
                        costoTotal,
                        fechaConsulta
                    );
                } else {
                    console.log("No se encontraron costos para esta consulta.");
                }

            })
            
            // window.location.href = `/FinalizarCita/${id}`;
    
        }
        menu.style.display = 'none';
    });




    // consultas vacunacion 




    
    const tablaV = document.getElementById('consultasVacunacion');
    let filaSeleccionadaV = null; // Para almacenar la fila seleccionada
    const menuV = document.getElementById('menuDos');


     // Mostrar el menú contextual al hacer clic derecho en una fila
    tablaV.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Evitar el menú contextual por defecto

        // Verificar si se hizo clic en una fila de la tabla (no en las celdas)
        if (e.target.tagName === 'TD') {
            // Obtener la fila en la que se hizo clic
            filaSeleccionadaV = e.target.closest('tr');

            // Obtener las coordenadas del clic
            const mouseX = e.pageX;
            const mouseY = e.pageY;

            // Mostrar el menú en las coordenadas del clic
            menuV.style.display = 'block';
            menuV.style.left = `${mouseX}px`;
            menuV.style.top = `${mouseY}px`;
        }
    });


    // Ocultar el menú cuando se hace clic en cualquier parte de la página
    document.addEventListener('click', (e) => {
        if (!menuV.contains(e.target) && e.target.tagName !== 'TD') {
            menuV.style.display = 'none';
        }
    });

     document.getElementById('opcion2').addEventListener('click', () => {
        if (filaSeleccionadaV) {
            const idConsulta = filaSeleccionadaV.cells[0].textContent;
            const nombrePropietario = filaSeleccionadaV.cells[1].textContent;
            const nombreMascota = filaSeleccionadaV.cells[2].textContent;
            const fechaConsulta = filaSeleccionadaV.cells[6].textContent;
            const descripcion = "Consulta de control";



            fetch('/consultarCostos', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idConsulta, descripcion})
            }).then(response => response.json()).then(resultado => {
                console.log("Datos recividos: ", resultado);

                if (resultado.length > 0) {
                    const costoMedicamentos = resultado[0].tb_costosConsultas_col_medicamentos;
                    const costoConsulta = resultado[0].tb_costosConsultas_col_consultal;
                    const costoExtras = resultado[0].tb_costosConsultas_col_extras;
                    const costoTotal = resultado[0].tb_costosConsultas_col_total;
                    const costoDescripcion = resultado[0].tb_costosConsultas_col_descripcion;

                    mostrarPantalla(
                        nombrePropietario, 
                        nombreMascota,
                        costoConsulta,
                        costoMedicamentos,
                        costoExtras,
                        costoDescripcion,
                        costoTotal,
                        fechaConsulta
                    );
                } else {
                    console.log("No se encontraron costos para esta consulta.");
                }

            })
            
            // window.location.href = `/FinalizarCita/${id}`;
    
        }
        menuV.style.display = 'none';
    });


})