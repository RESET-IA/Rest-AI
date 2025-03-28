function abrirEnlace() {
  window.open("https://drive.google.com/drive/folders/1bBpnlX9U4W52FewFDvMfpiAIXdOpRYSu", "_blank");
}

function openGoogleSheet() {
  window.open("https://docs.google.com/spreadsheets/d/1_ygV2KM26U2_x-E74jeejx038WqxT8UV/edit?gid=225908177#gid=225908177", "_blank");
}

function toggleTalentoChatSection() {
  document.getElementById('chatSectionTalento').style.display = 'block';
  document.getElementById('videoTalento').style.display = 'none'; // Oculta el video
  document.getElementById('adTalentoSection').style.display = 'none';
}

function closeTalentoChatSection() {
  document.getElementById('chatSectionTalento').style.display = 'none';
  document.getElementById('adTalentoSection').style.display = 'none';
  document.getElementById('videoTalento').style.display = 'block'; // Oculta el video
}

function closeTalentoChatSection() {
  document.getElementById('chatSectionTalento').style.display = 'none';
  document.getElementById('videoTalento').style.display = 'block'; // Muestra el video nuevamente
}

async function enviarPreguntaTalento() {
  const prompt = document.getElementById("userPromptTalento").value;
  const respuesta = document.getElementById("respuestaLiaTalento");
  const apiKey = "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"; // Reemplaza con tu API Key

  if (!prompt) {
    alert("Por favor escribe una pregunta.");
    return;
  }

  respuesta.value = "Pensando...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      respuesta.value = data.choices[0].message.content.trim();
    } else {
      respuesta.value = "No se pudo obtener una respuesta.";
    }
  } catch (error) {
    respuesta.value = "Error al conectar con LIA®.";
  }
}