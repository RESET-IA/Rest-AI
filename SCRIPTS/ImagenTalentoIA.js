function toggleAdTalento() {
    document.getElementById('chatSectionTalento').style.display = 'none';
    document.getElementById('videoTalento').style.display = 'none'; // Oculta el video
    document.getElementById('adTalentoSection').style.display = 'block';
  }

  function closeAdTalento() {
    document.getElementById('adTalentoSection').style.display = 'none';
    document.getElementById('chatSectionTalento').style.display = 'none';
    document.getElementById('videoTalento').style.display = 'block';
  }

  async function generateImageTalento() {
    const prompt = document.getElementById("promptTalento").value.trim();
    const imageContainer = document.getElementById("imageContainerTalento");
    imageContainer.style.display = "flex";
    imageContainer.innerHTML = `<p style="color: white; font-size: 18px;">Generando imagen...</p>`;

    if (!prompt) {
      alert("Por favor, ingresa una descripción.");
      return;
    }

    const API_KEY = "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";

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