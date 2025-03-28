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


let documentText = "";
         document.getElementById('fileInput').addEventListener('change', async function () {
         const file = this.files[0];
         if (!file) return;
         const reader = new FileReader();
         if (file.type === "text/plain") {
         reader.onload = function (e) {
         documentText = e.target.result;
         alert("Documento TXT cargado con éxito");
        };
         reader.readAsText(file);
         } else if (file.type === "application/pdf") {
         const fileReader = new FileReader();
         fileReader.onload = async function () {
         const typedarray = new Uint8Array(this.result);
         const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
         let text = "";
         for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            text += strings.join(" ") + "\n";
          }
          documentText = text;
          alert("Documento PDF cargado con éxito");
        };
         fileReader.readAsArrayBuffer(file);
        } else {
         alert("Solo se aceptan archivos PDF o TXT.");
        }
       });
  
     async function askAI() {
         const question = document.getElementById("userQuestion").value;
         const output = document.getElementById("documentResponse");
         if (!documentText) {
         alert("Por favor sube primero un documento.");
         return;
        }
         if (!question.trim()) {
         alert("Escribe una pregunta.");
         return;
        }
  
      output.value = "Procesando...";
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
            { role: "system", content: "Eres un asistente experto que responde basándose en documentos subidos por el usuario." },
            { role: "user", content: `Este es el contenido del documento:\n\n${documentText}\n\nPregunta: ${question}` }
          ]
        })
      });
  
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        output.value = data.choices[0].message.content;
      } else {
        output.value = "Error al obtener respuesta.";
      }
    }
  
             function openDocumentSection() {
             document.getElementById('videoCarousel').style.display = 'none';
             document.getElementById('chatSection').style.display = 'none';
             document.getElementById('adStrategySection').style.display = 'none';
             document.getElementById('documentSection').style.display = 'block';
            }
  
             function resetConsulta() {
             document.getElementById('userQuestion').value = "";
             document.getElementById('documentResponse').value = "";
            }

             function cerrarDocumento() {
             document.getElementById('documentSection').style.display = 'none';
             document.getElementById('videoCarousel').style.display = 'block';
             document.getElementById('chatSection').style.display = 'none';
             document.getElementById('adStrategySection').style.display = 'none';
             
}