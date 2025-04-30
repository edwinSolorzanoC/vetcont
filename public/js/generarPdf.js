document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("button_generarpdf").addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const tablaInformacionPropietario = document.getElementById("informacionPropietario");
        const tablaInformacionMascota = document.getElementById("informacionPaciente");
        const tablaConsultasGenerales = document.getElementById("informacionConsultas");
        const tablaConsultasVacunacion = document.getElementById("informacionVacunacion");


        const fechaActual = new Date().toLocaleDateString();
        const margenIzquierdo = 14;
        let posicionY = 15;

        // Agregar fecha
        doc.setFontSize(10);
        doc.text(`Fecha: ${fechaActual}`, margenIzquierdo, posicionY);
        posicionY += 5;

        // Agregar título
        doc.setFontSize(16);
        doc.text("VETCONT", margenIzquierdo, posicionY);
        posicionY += 10;

        // === TABLA 1: INFORMACIÓN DEL PROPIETARIO ===
        const header1 = [];
        const datos1 = [];
        tablaInformacionPropietario.querySelectorAll("thead tr th").forEach(th => header1.push(th.innerText));
        tablaInformacionPropietario.querySelectorAll("tbody tr").forEach(tr => {
            const fila = [];
            tr.querySelectorAll("td").forEach(td => fila.push(td.innerText));
            datos1.push(fila);
        });

        doc.autoTable({
            head: [header1],
            body: datos1,
            startY: posicionY + 5,
            margin: { left: margenIzquierdo, right: 14 },
        });
        posicionY = doc.lastAutoTable.finalY + 10;

        // === TABLA 2: INFORMACIÓN DE LA MASCOTA ===
        const header2 = [];
        const datos2 = [];
        tablaInformacionMascota.querySelectorAll("thead tr th").forEach(th => header2.push(th.innerText));
        tablaInformacionMascota.querySelectorAll("tbody tr").forEach(tr => {
            const fila = [];
            tr.querySelectorAll("td").forEach(td => fila.push(td.innerText));
            datos2.push(fila);
        });

        doc.autoTable({
            head: [header2],
            body: datos2,
            startY: posicionY,
            margin: { left: margenIzquierdo, right: 14 },
        });
        posicionY = doc.lastAutoTable.finalY + 10;

        // === TABLA 3: CONSULTAS GENERALES ===
        const header3 = [];
        const datos3 = [];
        tablaConsultasGenerales.querySelectorAll("thead tr th").forEach(th => header3.push(th.innerText));
        tablaConsultasGenerales.querySelectorAll("tbody tr").forEach(tr => {
            const fila = [];
            tr.querySelectorAll("td").forEach(td => fila.push(td.innerText));
            datos3.push(fila);
        });

        doc.autoTable({
            head: [header3],
            body: datos3,
            startY: posicionY,
            margin: { left: margenIzquierdo, right: 14 },
        });

        posicionY = doc.lastAutoTable.finalY + 10;

        // === TABLA 3: CONSULTAS GENERALES ===
        const header4 = [];
        const datos4 = [];
        tablaConsultasVacunacion.querySelectorAll("thead tr th").forEach(th => header4.push(th.innerText));
        tablaConsultasVacunacion.querySelectorAll("tbody tr").forEach(tr => {
            const fila = [];
            tr.querySelectorAll("td").forEach(td => fila.push(td.innerText));
            datos4.push(fila);
        });

        doc.autoTable({
            head: [header4],
            body: datos4,
            startY: posicionY,
            margin: { left: margenIzquierdo, right: 14 },
        });


        const nombrePropietario = tablaInformacionPropietario.querySelector("tbody tr td")?.innerText || "Desconocido";
        const nombreArchivo = `Reporte ${nombrePropietario} ${fechaActual}.pdf`;

        // Pie de página con número de página (en cada página generada)
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.setFontSize(10);
            doc.text(`Página ${i}`, margenIzquierdo, pageHeight - 10);
        }

        doc.save(nombreArchivo);
    });
});
