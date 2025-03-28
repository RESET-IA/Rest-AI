function toggleChatSection() {
    document.getElementById('videoCarousel').style.display = 'none';
    document.getElementById('adStrategySection').style.display = 'none';
    document.getElementById('chatSection').style.display = 'block';
    document.getElementById('documentSection').style.display = 'none';
}

function toggleAdStrategy() {
    document.getElementById('videoCarousel').style.display = 'none';
    document.getElementById('chatSection').style.display = 'none';
    document.getElementById('adStrategySection').style.display = 'block';
    document.getElementById('documentSection').style.display = 'none';
}

function openDocumentSection() {
    document.getElementById('videoCarousel').style.display = 'none';
    document.getElementById('chatSection').style.display = 'none';
    document.getElementById('adStrategySection').style.display = 'none';
    document.getElementById('documentSection').style.display = 'block';
   }

function closeAdStrategy() {
    document.getElementById('adStrategySection').style.display = 'none';
    document.getElementById('videoCarousel').style.display = 'block';
    
}

async function generateImage() {
    const prompt = document.getElementById("prompt").value.trim();
    const imageContainer = document.getElementById("imageContainer");
    // Mostrar el contenedor antes de generar la imagen
    imageContainer.style.display = "flex";
    imageContainer.innerHTML = `<p style="color: white; font-size: 18px;">Generando imagen...</p>`;

    if (!prompt) {
        alert("Por favor, ingresa una descripción.");
        return;
    }

    const API_KEY = "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"; // Reemplaza con tu clave real

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt,
                n: 1,
                size: "1024x1024"
            })
        });

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const imageUrl = data.data[0].url;
            imageContainer.innerHTML = `
                <img src="${imageUrl}" alt="Imagen generada" style="margin-top: 8px; display: block; max-width: 40%; max-height: 40%;">
            `;
        } else {
            imageContainer.innerHTML = "<p style='color: red;'>Error al generar la imagen.</p>";
        }
    } catch (error) {
        imageContainer.innerHTML = "<p style='color: red;'>Error en la solicitud. Verifica tu clave API o conexión.</p>";
    }
}