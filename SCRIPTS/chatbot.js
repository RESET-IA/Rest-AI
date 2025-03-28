document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("gestionEquiposBtn").addEventListener("click", function() {
        let chatbotContainer = document.getElementById("chatbot-container");
        chatbotContainer.style.display = chatbotContainer.style.display === "none" ? "block" : "none";
    });
});

