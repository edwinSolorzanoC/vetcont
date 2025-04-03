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
        }
        
    } 
    
    if (urlParams.has("success")) {
        const successType = urlParams.get("success");

        if (successType === "loginSuccess") {
            Swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
                text: "Bienvenido a VETCONT",
                showConfirmButton: false,
                timer: 2000
            });
        }
        
    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});