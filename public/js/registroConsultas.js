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
})