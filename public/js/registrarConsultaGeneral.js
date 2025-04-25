document.addEventListener('DOMContentLoaded', function(){

    document.querySelectorAll("#tabla_pacientes tr").forEach((fila,index) => {

        fila.addEventListener('click', function(){

            const nombrePropietario = fila.cells[0].textContent;
            const nombreMascota = fila.cells[1].textContent; 

            document.getElementById('nombrePropietarioConsulta').value = nombrePropietario;
            document.getElementById('nombreMascotaConsulta').value = nombreMascota;
        })
    })

})