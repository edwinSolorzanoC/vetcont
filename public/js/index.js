

const iniciarSesion = document.getElementById("btn_mostrarLogin");
const formularioIniciarSesion = document.getElementById("formularioLogin");

const crearCuenta = document.getElementById("btn_mostrarSingIn")
const formularioCrearCuenta = document.getElementById("formularioSingIn");

const actualizar = document.getElementById("olvideContrasennaBtn")
const formularioActualizar = document.getElementById("formularioContrasenna");

iniciarSesion.addEventListener('click', function(){
    if(formularioIniciarSesion.style.display === "none"){
        formularioCrearCuenta.style.display = 'none';
        formularioActualizar.style.display = 'none';
        formularioIniciarSesion.style.display = 'block';
        
    }else{
        formularioIniciarSesion.style.display = 'none';
        formularioCrearCuenta.style.display = 'none';
        formularioActualizar.style.display = 'none';
    }
});

crearCuenta.addEventListener('click', function(){
    if(formularioCrearCuenta.style.display === "none"){
        formularioIniciarSesion.style.display = 'none';
        formularioActualizar.style.display = 'none';
        formularioCrearCuenta.style.display = 'block';

        
    }else{
        formularioIniciarSesion.style.display = 'none';
        formularioCrearCuenta.style.display = 'none';
        formularioActualizar.style.display = 'none';
    }
});


actualizar.addEventListener('click', function(){
    if(formularioActualizar.style.display === "none"){
        formularioActualizar.style.display = 'block';
        formularioIniciarSesion.style.display = 'none';
        formularioCrearCuenta.style.display = 'none';

        
    }else{
        formularioActualizar.style.display = 'none';
        formularioIniciarSesion.style.display = 'none';
        formularioCrearCuenta.style.display = 'none';
    }
});


