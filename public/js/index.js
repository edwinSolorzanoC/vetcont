

const iniciarSesion = document.getElementById("btn_mostrarLogin");
const formularioIniciarSesion = document.getElementById("formularioLogin");

const crearCuenta = document.getElementById("btn_mostrarSingIn")
const formularioCrearCuenta = document.getElementById("formularioSingIn");

iniciarSesion.addEventListener('click', function(){
    if(formularioIniciarSesion.style.display === "none"){
        formularioCrearCuenta.style.display = 'none';
        formularioIniciarSesion.style.display = 'block';
        
    }else{
        formularioIniciarSesion.style.display = 'none';
        formularioCrearCuenta.style.display = 'none';
    }
});

crearCuenta.addEventListener('click', function(){
    if(formularioCrearCuenta.style.display === "none"){
        formularioIniciarSesion.style.display = 'none';
        formularioCrearCuenta.style.display = 'block';
        
    }else{
        formularioIniciarSesion.style.display = 'none';
        formularioCrearCuenta.style.display = 'none';
    }
});


