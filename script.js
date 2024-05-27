document.getElementById('startButton').addEventListener('click', startRecognition);

function startRecognition() {
    const statusElement = document.getElementById('status');
    const transcriptionElement = document.getElementById('transcription');
    const searchInput = document.getElementById('intranet-searchbox-query');

    // Verifica si el navegador soporta la API de reconocimiento de voz
    if (!('webkitSpeechRecognition' in window)) {
        statusElement.innerText = "Estado: API de reconocimiento de voz no soportada";
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        statusElement.innerText = "Estado: Escuchando...";
        document.getElementById('startButton').classList.add("wave")
    };

 
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;        
        searchInput.value = transcript;
        getLink(transcript);
    };

    recognition.onerror = function(event) {
        statusElement.innerText = "Estado: Error en el reconocimiento de voz";
        console.error(event.error);
    };

    recognition.onend = function() {
        statusElement.innerText = "Estado: Inactivo";
        document.getElementById('startButton').classList.remove("wave")
    };

    recognition.start();
}

function startTimer() {
    // if (timer) {
    //     clearTimeout(timer);
    // }
    // timer = setTimeout(() => {
    //     document.getElementById('searchForm').submit();
    // }, 3000); // Enviar el formulario después de 3 segundos

    return true;
}
function getLink(transcript) {
    const lowerTranscript = transcript.toLowerCase();
    const keywords = {
        'talento': 'talento.test',
        'calendario laboral': 'calendario.test',
        'registro horario': 'registro.test'
    };

    for (const [keyword, link] of Object.entries(keywords)) {
        if (lowerTranscript.includes(keyword)) {
            window.location.replace("#"+link)
        }
    }

    startTimer();
}

document.getElementById('toggleButton').addEventListener('click', function() {
    var container = document.getElementById('full-search-container');
    container.classList.remove('close');
    if (container.classList.contains('show')) {
        container.classList.remove('show');
    } else {
        container.classList.add('show');
    }
});

document.getElementById('toggleButtonClose').addEventListener('click', function() {
    var container = document.getElementById('full-search-container');
    container.classList.remove('show');
    container.classList.add('close');
});