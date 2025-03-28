let originalMainMargin = null; // Guardar el margen original de main

function toggleSidebar() {
    let sidebar = document.querySelector(".sidebar");
    let main = document.querySelector(".main");

    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {
        // Guardamos el margen original de main solo la primera vez
        if (originalMainMargin === null) {
            originalMainMargin = main.style.marginLeft; 
        }
        localStorage.setItem("sidebarState", "collapsed");
        main.classList.add("centered");
        main.style.marginLeft = "auto";  // Centramos el main cuando se colapsa
    } else {
        localStorage.setItem("sidebarState", "expanded");
        main.classList.remove("centered");
        main.style.marginLeft = originalMainMargin; // Restauramos la posición original cuando el menú se expanda
    }
}

// Aplicar estado guardado al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    let sidebarState = localStorage.getItem("sidebarState");
    let sidebar = document.querySelector(".sidebar");
    let main = document.querySelector(".main");

    if (sidebarState === "collapsed") {
        sidebar.classList.add("collapsed");
        main.classList.add("centered");
        main.style.marginLeft = "auto"; // Centramos el main si el menú estaba colapsado al cargar
    }
});

// Evento para el botón de colapsar menú
document.getElementById("collapse-menu").addEventListener("click", function () {
    toggleSidebar();
    let icon = this.querySelector("i");
    icon.classList.toggle("fa-chevron-left");
    icon.classList.toggle("fa-chevron-right");
});
