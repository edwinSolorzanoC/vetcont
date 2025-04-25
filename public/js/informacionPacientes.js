document.addEventListener('DOMContentLoaded', function(){

    const mostrarVacunacion = document.getElementById("button_vacunacion")
    const mostrarConsultas = document.getElementById("button_consultas")
    const mostarPaciente = document.getElementById("button_paciente")
    const mostrarPropietario = document.getElementById("button_propietario")

    const tablaVacunacion = document.getElementById("informacionVacunacion");
    const tablaConsultas = document.getElementById("informacionConsultas");
    const tablaPaciente = document.getElementById("informacionPaciente");
    const tablaPropietario = document.getElementById("informacionPropietario");

    mostrarVacunacion.addEventListener('click', function(){
        tablaPropietario.style.display = 'none'
        tablaConsultas.style.display = 'none'
        tablaPaciente.style.display = 'none'
        tablaVacunacion.style.display = 'block'
        
    });

    mostrarConsultas.addEventListener('click', function(){
        tablaPropietario.style.display = 'none'
        tablaPaciente.style.display = 'none'
        tablaVacunacion.style.display = 'none'
        tablaConsultas.style.display = 'block'
        
    });

    mostarPaciente.addEventListener('click', function(){
        tablaPropietario.style.display = 'none'
        tablaVacunacion.style.display = 'none'
        tablaConsultas.style.display = 'none'
        tablaPaciente.style.display = 'block'
        
    });

    mostrarPropietario.addEventListener('click', function(){
        tablaVacunacion.style.display = 'none'
        tablaConsultas.style.display = 'none'
        tablaPaciente.style.display = 'none'
        tablaPropietario.style.display = 'block'
        
    });
})