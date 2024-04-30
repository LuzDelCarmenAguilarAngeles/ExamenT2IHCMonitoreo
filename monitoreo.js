const API_URL = 'https://65ef77c3ead08fa78a507bac.mockapi.io/ExCasaIHC';
const imagen = document.querySelector('.imagen img');
let isAlarmActive = false;
const alarmAudio = new Audio('images/alarma.mp3');

async function fetchLastOrder() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener datos de la API');
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error('No hay datos disponibles en la API');
    }
    const lastOrder = data[data.length - 1];
    return lastOrder;
  } catch (error) {
    console.error(error.message);
  }
}

function displayLastOrder(order) {
  const lastOrderDiv = document.getElementById('last-order');

  if (order) {
    lastOrderDiv.innerHTML = `Orden: ${order.orden}<br>Usuario: ${order.usuario}<br>Fecha y Hora: ${order.fechaHora}`;

    if (order.orden === 'Alexa, enciende la luz de la recámara.') {
      imagen.src = 'images/PrenderFocoRecamara.png';
    } else if (order.orden === 'Alexa, enciende la luz de la sala.') {
      imagen.src = 'images/PrenderFocoSala.png';
    } else if (order.orden === 'Alexa, enciende las luces del jardín.') {
      imagen.src = 'images/PrenderFocosJardín.png';
    } else if (order.orden === 'Alexa, enciende el ventilador.') {
      imagen.src = 'images/EncenderVentilador.gif';
    } else if (order.orden === 'Alexa, abre las cortinas.') {
      imagen.src = 'images/AbrirCortinas.gif';
      setTimeout(function() {
        imagen.src = 'images/cortinasAbiertas.png';
      }, 2000);
    } else if (order.orden === 'Alexa, enciende la alarma') {
      if (!isAlarmActive) {
        isAlarmActive = true;
        // Reproducir el audio de la alarma en bucle
        alarmAudio.loop = true;
        alarmAudio.play();
      }
    } else if (order.orden === 'Alexa, enciende las cámaras de vigilancia.') {
      imagen.src = 'images/PrenderCamaras.png';
    } else if (order.orden === 'Alexa apaga la luz de la recámara.') {
      imagen.src = 'images/casa.png';
    } else if (order.orden === 'Alexa apaga la luz de la sala.') {
      imagen.src = 'images/casa.png';
    } else if (order.orden === 'Alexa, apaga las luces del jardín.') {
      imagen.src = 'images/casa.png';
    } else if (order.orden === 'Alexa, apaga el ventilador.') {
      imagen.src = 'images/casa.png';
    } else if (order.orden === 'Alexa cierra las cortinas.') {
      imagen.src = 'images/AbrirCortinas.gif';
      setTimeout(function() {
        imagen.src = 'images/casa.png';
      }, 2000);
    } else if (order.orden === 'Alexa apaga la alarma.') {
      if (isAlarmActive) {
        isAlarmActive = false;
        // Detener la reproducción del audio de la alarma
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
      }
    } else if (order.orden === 'Alexa apaga las cámaras de vigilancia.') {
      imagen.src = 'images/casa.png';
    }
  } else {
    lastOrderDiv.textContent = 'No se pudo obtener la última orden';
  }
}

async function updateLastOrder() {
  const lastOrder = await fetchLastOrder();
  displayLastOrder(lastOrder);
}

// Actualiza la última orden cada 2 segundos
setInterval(updateLastOrder, 2000);

// Carga la última orden al cargar la página
updateLastOrder();
