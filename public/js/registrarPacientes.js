document.addEventListener('DOMContentLoaded', function(){

    // navegacion de sistemas
    const mostrarFormularioPropietarios = document.getElementById("btn_formularioPropietario");
    const mostrarFormularioPacientes = document.getElementById("btn_formularioPacientes");

    const formularioPropietario = document.getElementById("registroPropietarios");
    const formularioPacientes = document.getElementById("registorPacientes");


    mostrarFormularioPacientes.addEventListener('click', function(){
        formularioPropietario.style.display = 'none'
        formularioPacientes.style.display = 'block'

    });

    mostrarFormularioPropietarios.addEventListener('click', function(){
        formularioPacientes.style.display = 'none'
        formularioPropietario.style.display = 'block'

    });


    // cambiar fecha de nacimiento automaticamente
    document.getElementById('fechaNacimientoMascota').addEventListener('change', function() {
        const fechaNacimientoMascota = new Date(this.value);
        const fechaHoy = new Date();
    
        let edad = fechaHoy.getFullYear() - fechaNacimientoMascota.getFullYear();
        let mes = fechaHoy.getMonth() - fechaNacimientoMascota.getMonth();
    
        if (mes < 0 || (mes === 0 && fechaHoy.getDate() < fechaNacimientoMascota.getDate())) {
            edad--;
            mes += 12; // Asegurar que los meses sean positivos
        }
    
        // Si es menor de un año, calcular la edad en formato decimal
        const edadConDecimales = edad + (mes / 12);
        document.getElementById('edadMascota').value = edadConDecimales.toFixed(1); // Ejemplo: 0.3 para 3 meses

    });
})