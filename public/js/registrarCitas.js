document.addEventListener('DOMContentLoaded', function(){

    document.querySelectorAll("#tabla_pacientes tr").forEach((fila,index) => {

        fila.addEventListener('click', function(){

            const nombrePropietario = fila.cells[0].textContent;
            const nombreMascota = fila.cells[1].textContent; 

            document.getElementById('nombrePropietarioCita').value = nombrePropietario;
            document.getElementById('nombreMascotaCita').value = nombreMascota;
        })
    })


    

const inputFecha = document.getElementById("fechaCita");
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
  const dd = String(hoy.getDate()).padStart(2, '0'); // Día con 2 dígitos
  const fechaHoy = `${yyyy}-${mm}-${dd}`;

    inputFecha.min = fechaHoy;

})