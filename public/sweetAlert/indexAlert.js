document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("error")) {
        const errorType = urlParams.get("error");

        // inicio de sesion
        if (errorType === "internalError") {
            Swal.fire({
                icon: "error",
                title: "Error interno",
                text: "Ocurrió un error inesperado. Inténtalo de nuevo.",
            });
        }else if (errorType === "incorrectPassword") {
            Swal.fire({
                icon: "error",
                title: "Contraseña incorrecta",
                text: "La contraseña que ingresaste es incorrecta.",
            });
        }
        else if (errorType === "userNotFound") {
            Swal.fire({
                icon: "error",
                title: "Usuario no encontrado",
                text: "No se encontró un usuario con ese nombre de usuario.",
            });
        } else if (errorType === "sesionError") {
            Swal.fire({
                icon: "error",
                title: "Lo sentimos, Error de sesion",
                text: "Ocurrió un error inesperado. Inicie sesion de nuevo.",
            });
        }
    } 
    
    if (urlParams.has("success")) {
        const successType = urlParams.get("success");


        
    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});