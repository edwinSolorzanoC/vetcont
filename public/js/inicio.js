

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


})