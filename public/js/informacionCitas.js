
document.addEventListener('DOMContentLoaded', function(){
    
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
                    window.location.href = `/cancelarCitaInformacion/${id}`;
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

})