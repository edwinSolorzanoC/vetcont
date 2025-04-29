

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

    // Ocultar el menú cuando se hace clic en cualquier parte de la página
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target.tagName !== 'TD') {
            menu.style.display = 'none';
        }
    });

    // Acciones del menú contextual
    document.getElementById('opcion1').addEventListener('click', () => {
        if (filaSeleccionada) {
            const nombrePropietario = filaSeleccionada.cells[0].textContent;
            const nombreMascota = filaSeleccionada.cells[1].textContent;

    
            // Mostrar la alerta de SweetAlert
            Swal.fire({
                title: 'Finalizar Cita?',
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
                    // window.location.href = `/FinalizarCita/${id}`;
                }
            });
        }
        menu.style.display = 'none';
    });
    

   
})


