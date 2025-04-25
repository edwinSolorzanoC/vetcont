document.addEventListener('DOMContentLoaded', function(){

    document.querySelectorAll("#tabla_pacientes tr").forEach((fila,index) => {

        fila.addEventListener('click', function(){

            const nombrePropietario = fila.cells[0].textContent;
            const nombreMascota = fila.cells[1].textContent; 

            document.getElementById('nombrePropietarioCita').value = nombrePropietario;
            document.getElementById('nombreMascotaCita').value = nombreMascota;
        })
    })

})