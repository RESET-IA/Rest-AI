//login
let requestedSection = "";
function showLogin(sectionId) {
    requestedSection = sectionId;
    document.getElementById("loginPopup").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginPopup").style.display = "none";
    document.getElementById("passwordInput").value = "";
}

function validatePassword() {
    const password = document.getElementById("passwordInput").value;

    // Diccionario de contraseñas por sección
    const passwords = {
        'neuromarketing': 'n',
        'talento-humano': 't'
    };

    if (password === passwords[requestedSection]) {
        closeLogin();
        showSection(requestedSection);
    } else {
        alert("Contraseña incorrecta.");
    }
}