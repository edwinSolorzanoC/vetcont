

document.addEventListener('DOMContentLoaded', function(){

    const mostrarCitas = document.getElementById("btn_mostrarCitas");
    const mostraConsultas = document.getElementById("btn_mostrarConsultas");

    const citas = document.getElementById("proximasCitas")
    const consultas = document.getElementById("consultasRealizadas")


    mostraConsultas.addEventListener('click', function(){
        consultas.style.display = 'block';
        citas.style.display = 'none';
    });

    mostrarCitas.addEventListener('click', function(){
        citas.style.display = 'block';
        consultas.style.display = 'none';
    })



    const menu = document.getElementById('menu');
    const tabla = document.getElementById('miTabla');
    let filaSeleccionada = null; // Para almacenar la fila seleccionada

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

    let touchTimeout;

tabla.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'TD') {
        touchTimeout = setTimeout(() => {
            const touch = e.touches[0];
            filaSeleccionada = e.target.closest('tr');

            menu.style.display = 'block';
            menu.style.left = `${touch.pageX}px`;
            menu.style.top = `${touch.pageY}px`;
        }, 600); // 600ms para long press
    }
});

tabla.addEventListener('touchend', () => {
    clearTimeout(touchTimeout); // Cancelar si fue solo un toque rápido
});


    // Ocultar el menú cuando se hace clic en cualquier parte de la página
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target.tagName !== 'TD') {
            menu.style.display = 'none';
        }
    });

    // Acciones del menú contextual
    document.getElementById('opcion1').addEventListener('click', () => {
        if (filaSeleccionada) {
            const id = filaSeleccionada.cells[0].textContent;
            const nombrePropietario = filaSeleccionada.cells[1].textContent;
            const nombreMascota = filaSeleccionada.cells[2].textContent;

    
            // Mostrar la alerta de SweetAlert
            Swal.fire({
                title: 'La cita ya fue realizada?',
                text: `Estás a punto de finalizar la cita de: ${nombrePropietario} con ${nombreMascota}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {

                    Swal.fire({
                        title: 'Cita Finalizada',
                        text: `La cita se finalizo con exito`,
                        icon: 'success',
                    })
                    // se hace una ruta donde se reciva el id y se cancele la cita
                    window.location.href = `/FinalizarCita/${id}`;
                }
            });
        }
        menu.style.display = 'none';
    });

    document.getElementById('opcion2').addEventListener('click', () => {
        if (filaSeleccionada) {
            const id = filaSeleccionada.cells[0].textContent;
            const nombrePropietario = filaSeleccionada.cells[1].textContent;
            const nombreMascota = filaSeleccionada.cells[2].textContent;

    
            // Mostrar la alerta de SweetAlert
            Swal.fire({
                title: 'Cancelar Cita?',
                text: `Estás a punto de cancelar la cita de: ${nombrePropietario} con ${nombreMascota}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {

                    Swal.fire({
                        title: 'Cita Cancelada',
                        text: `La cita se Canceló con exito`,
                        icon: 'success',
                    })
                    // se hace una ruta donde se reciva el id y se cancele la cita
                    window.location.href = `/CancelarCita/${id}`;
                }
            });
        }
        menu.style.display = 'none';
    });


    const formularioFlotante = document.getElementById("FormularioFlotante");

    document.getElementById("cerraFormulario").addEventListener('click', function(){
        formularioFlotante.style.display = 'none'
    })

    document.getElementById('opcion3').addEventListener('click', () => {
        const id = filaSeleccionada.cells[0].textContent;
        const descripcion = filaSeleccionada.cells[5].textContent;

        formularioFlotante.style.display = 'block'
        document.getElementById("idCitaFormulario").value = id;
        document.getElementById("descripcionReprogramada").value = descripcion;

        menu.style.display = 'none';


    });
    



 
    // pantalla consultas 


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

    const tablaConsultas = document.getElementById('tablaConsultasGenerales');
    let filaSeleccionadaConsultas = null; // Para almacenar la fila seleccionada
    const menuConsultas = document.getElementById('menuConcultas');

    tablaConsultas.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Evitar el menú contextual por defecto

        // Verificar si se hizo clic en una fila de la tabla (no en las celdas)
        if (e.target.tagName === 'TD') {
            // Obtener la fila en la que se hizo clic
            filaSeleccionadaConsultas = e.target.closest('tr');

            // Obtener las coordenadas del clic
            const mouseX = e.pageX;
            const mouseY = e.pageY;

            // Mostrar el menú en las coordenadas del clic
            menuConsultas.style.display = 'block';
            menuConsultas.style.left = `${mouseX}px`;
            menuConsultas.style.top = `${mouseY}px`;
        }
    });

     // Ocultar el menú cuando se hace clic en cualquier parte de la página
    document.addEventListener('click', (e) => {
        if (!menuConsultas.contains(e.target) && e.target.tagName !== 'TD') {
            menuConsultas.style.display = 'none';
        }
    });


    document.getElementById('costos').addEventListener('click', () => {
        if (filaSeleccionadaConsultas) {
            const idConsulta = filaSeleccionadaConsultas.cells[0].textContent;
            const nombrePropietario = filaSeleccionadaConsultas.cells[1].textContent;
            const nombreMascota = filaSeleccionadaConsultas.cells[2].textContent;
            const descripcion = filaSeleccionadaConsultas.cells[3].textContent;
            const ahora = new Date();
            const fechaConsulta = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;


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
            
    
        }
        menuConsultas.style.display = 'none';
    });

    
    

const inputFecha = document.getElementById("nuevaFechaRprogramada");
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
  const dd = String(hoy.getDate()).padStart(2, '0'); // Día con 2 dígitos
  const fechaHoy = `${yyyy}-${mm}-${dd}`;

    inputFecha.min = fechaHoy;
})


