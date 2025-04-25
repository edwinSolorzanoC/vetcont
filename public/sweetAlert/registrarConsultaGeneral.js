document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("error")) {
        const errorType = urlParams.get("error");

        if (errorType === "internalError") {
            Swal.fire({
                icon: "error",
                title: "Error interno",
                text: "Ocurrió un error inesperado. Inténtalo de nuevo.",
            });
        }else if (errorType === "databaseError") {
            Swal.fire({
                icon: "error",
                title: "Error en la base de datos",
                text: "Hubo un problema al consultar la base de datos. Inténtalo nuevamente.",
            });
        }

    } 
    
    if (urlParams.has("success")) {
        const successType = urlParams.get("success");

        if(successType === "consultaUpdate"){
            Swal.fire({
                icon: "success",
                title: "¡Consulta registrada exitosamente!",
                showConfirmButton: false,
                timer: 1500
            });
        }
        
    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});