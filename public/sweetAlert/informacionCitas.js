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
        }else if (errorType === "sesionError") {
            Swal.fire({
                icon: "error",
                title: "Error de sesion",
                text: "Ocurrió un error inesperado. Inténtalo de nuevo.",
            });
        }
        
        
    } 
    
    if (urlParams.has("success")) {
        const successType = urlParams.get("success");

        if (successType === "citaReprogramada") {
            Swal.fire({
                icon: "success",
                title: "Cita Reprogramada",
                text: "La cita fue reprogramada con exito",
            });
        }else if (successType === "citaCancelada") {
            Swal.fire({
                icon: "success",
                title: "Cita Cancelada",
                text: "La cita fue cancelada con exito",
            });
        }else if (successType === "citaFinalizada") {
            Swal.fire({
                icon: "success",
                title: "Cita Finalizada",
                text: "La cita fue finalizada con exito",
            });
        }
        
    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});