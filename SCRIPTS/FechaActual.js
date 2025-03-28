      function mostrarFechaYHora() {
        const fechaElemento = document.getElementById("fechaActual");
        const horaElemento = document.getElementById("horaActual");
        const ahora = new Date();
    
        const opcionesFecha = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
    
        const fechaFormateada = ahora.toLocaleDateString('es-EC', opcionesFecha);
        const horaFormateada = ahora.toLocaleTimeString('es-EC', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
    
        fechaElemento.textContent = `📅 Hoy es ${fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1)}`;
        horaElemento.textContent = `🕒 Hora actual en Ecuador: ${horaFormateada}`;
      }
    
      mostrarFechaYHora();
      setInterval(mostrarFechaYHora, 1000); // Actualiza cada segundo
