function toggleChatSection() {
    document.getElementById('videoCarousel').style.display = 'none';
    document.getElementById('chatSection').style.display = 'block';
    document.getElementById('documentSection').style.display = 'none';
    document.getElementById('adStrategySection').style.display = 'none';
}

function toggleAdStrategy() {
    document.getElementById('videoCarousel').style.display = 'none';
    document.getElementById('chatSection').style.display = 'none';
    document.getElementById('documentSection').style.display = 'none';
    document.getElementById('adStrategySection').style.display = 'block';
}

function openDocumentSection() {
    document.getElementById('videoCarousel').style.display = 'none';
    document.getElementById('chatSection').style.display = 'none';
    document.getElementById('adStrategySection').style.display = 'none';
    document.getElementById('documentSection').style.display = 'block';
   }

         function closeChat() {
            document.getElementById('chatSection').style.display = 'none';
            document.getElementById('videoCarousel').style.display = 'block';
            document.getElementById('documentSection').style.display = 'none';
            document.getElementById('adStrategySection').style.display = 'none';
        }

             async function askChatGPT() {
             let userInput = document.getElementById('userInput').value;
             if (userInput.trim() === "") {
             alert("Por favor, escribe una pregunta.");
             return;
            }
             document.getElementById('responseOutput').value = "Generando respuesta...";
             document.getElementById('loadingContainer').style.display = "block";
             document.getElementById('loadingBar').style.width = "0%";
             let progress = 0;
             let loadingInterval = setInterval(() => {
             if (progress < 100) {
             progress += 5;
             document.getElementById('loadingBar').style.width = progress + "%";
             document.getElementById('loadingPercentage').innerText = progress + "%";
            }
            }, 300);

    const API_KEY = "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"; // API Key de OpenAI
    const API_URL = "https://api.openai.com/v1/chat/completions";

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: userInput }]
            })
        });
        let data = await response.json();
        clearInterval(loadingInterval);
        document.getElementById('loadingBar').style.width = "100%";
        document.getElementById('loadingPercentage').innerText = "100%";
        document.getElementById('responseOutput').value = data.choices[0].message.content;
    } catch (error) {
        clearInterval(loadingInterval);
        document.getElementById('loadingBar').style.width = "100%";
        document.getElementById('loadingPercentage').innerText = "100%";
        console.error("Error al conectar con la IA:", error);
        document.getElementById('responseOutput').value = "Error en la respuesta. Inténtalo de nuevo.";
    }
    }