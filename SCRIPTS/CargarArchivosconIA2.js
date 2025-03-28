  let documentTextTH = "";

  function abrirTalentoHumanoLIA() {
    const seccion = document.getElementById("documentSectionTH");
    const video = document.getElementById("videoTalento");

    if (seccion) {
      seccion.style.display = "block";
      seccion.scrollIntoView({ behavior: "smooth" });
    }

    if (video) video.style.display = "none";

    // Oculta otras secciones si existen
    ["chatSectionTH", "adStrategySectionTH", "editorSectionTH"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const inputTH = document.getElementById('fileInputTH');
    if (inputTH) {
      inputTH.addEventListener('change', async function () {
        const file = this.files[0];
        if (!file) return;

        if (file.type === "text/plain") {
          const reader = new FileReader();
          reader.onload = function (e) {
            documentTextTH = e.target.result;
            alert("✅ Documento TXT cargado con éxito.");
          };
          reader.readAsText(file);
        } else if (file.type === "application/pdf") {
          const reader = new FileReader();
          reader.onload = async function () {
            const typedarray = new Uint8Array(this.result);
            const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
            let text = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const content = await page.getTextContent();
              const strings = content.items.map(item => item.str);
              text += strings.join(" ") + "\n";
            }
            documentTextTH = text;
            alert("✅ Documento PDF cargado con éxito.");
          };
          reader.readAsArrayBuffer(file);
        } else {
          alert("❌ Solo se aceptan archivos PDF o TXT.");
        }
      });
    }
  });

  async function askAITH() {
    const question = document.getElementById("userQuestionTH").value.trim();
    const output = document.getElementById("documentResponseTH");

    if (!documentTextTH) {
      alert("⚠️ Por favor sube primero un documento.");
      return;
    }

    if (!question) {
      alert("⚠️ Escribe una pregunta.");
      return;
    }

    output.value = "Procesando análisis con LIA®...";

    try {
      const API_KEY = "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";
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "Eres un asistente experto en Talento Humano y análisis de documentos laborales." },
            { role: "user", content: `Contenido del documento:\n\n${documentTextTH}\n\nPregunta: ${question}` }
          ]
        })
      });

      const data = await response.json();

      if (data.choices && data.choices[0]) {
        output.value = data.choices[0].message.content;
      } else {
        output.value = "⚠️ No se pudo obtener una respuesta clara.";
      }
    } catch (error) {
      output.value = "❌ Error al contactar la IA: " + error.message;
    }
  }

  function resetConsultaTH() {
    document.getElementById("userQuestionTH").value = "";
    document.getElementById("documentResponseTH").value = "";
  }

  function cerrarDocumentoTH() {
    document.getElementById("documentSectionTH").style.display = "none";
    document.getElementById("videoTalento").style.display = "block";

    // Limpia también el input de archivo y el texto cargado
    document.getElementById("fileInputTH").value = "";
    documentTextTH = "";
    resetConsultaTH();
  }
