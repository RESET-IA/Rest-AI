function showSection(sectionId) {
    // Oculta todas las secciones antes de mostrar la deseada
    document.querySelectorAll('.section').forEach(section => section.style.display = "none");
    document.querySelectorAll('.section1').forEach(section => section.style.display = "none");

    // Muestra la sección seleccionada
    document.getElementById(sectionId).style.display = "block";

    // Remueve la clase "active" de todos los elementos del menú
    document.querySelectorAll(".menu li").forEach(item => item.classList.remove("active"));

    // Agrega la clase "active" al botón que fue presionado
    let selectedItem = document.querySelector(`li[onclick="showSection('${sectionId}', event)"]`);
    if (selectedItem) {
        selectedItem.classList.add("active");
    }

    // Si la pantalla es de móvil o tablet, cierra el menú y muestra el contenido principal
    if (window.innerWidth <= 1024) {
        const sidebar = document.querySelector(".sidebar");
        const mainContent = document.querySelector(".main");
        const chatButton = document.querySelector(".chat-button");

        sidebar.classList.remove("open"); // Cierra el menú
        mainContent.style.display = "block"; // Vuelve a mostrar el contenido
        chatButton.style.display = "block"; // Muestra el botón de chat

        // Desplaza suavemente la sección seleccionada al centro
        setTimeout(() => {
            document.getElementById(sectionId).scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
    }
}

function toggleMenu() {
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main");
    const chatButton = document.querySelector(".chat-button");

    const isOpening = !sidebar.classList.contains("open"); // Detectamos si se está abriendo o cerrando

    // Alterna la clase "open" para mostrar u ocultar el menú
    sidebar.classList.toggle("open");

    // Si se abre el menú, oculta el contenido y el chat
    if (isOpening) {
        mainContent.style.display = "none"; 
        chatButton.style.display = "none";
    } else {
        mainContent.style.display = "block"; 
        chatButton.style.display = "block";
    }
}

// Agregar evento a las opciones del menú para registrar que se ha seleccionado una
document.querySelectorAll(".menu li").forEach(item => {
    item.addEventListener("click", function() {
        document.querySelector(".sidebar").classList.remove("open"); // Oculta el menú
        document.querySelector(".main").style.display = "block"; // Muestra el contenido
        document.querySelector(".chat-button").style.display = "block"; // Muestra el chat
    });
});