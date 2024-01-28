let secondsRemaining;
let timerId;

// Language Support
const language = navigator.language || substring(0, 2); // browser support for JavaScript

const styleConfig  = {
    'en': {
        'durationLabel':  'Timer Duration (seconds):',
        'startButton':   'Start',
        'stopButton':  'Stop',
        'resetButton':  'Reset',
        'progressBarColor':  '#4CAF50'
    },
    'es': {
        'durationLabel':  'Duración del temporizador (segundos):',
        'startButton':   'Comenzar',
        'stopButton':  'Detener',
        'resetButton':  'Restablecer',
        'progressBarColor': '#3498db'
    }
};

function applyStyles(language) {
    const styles = styleConfig[language];
document.getElementById('durationlabel').textContent = styles['durationLabel'];
document.getElementById('startButton').textContent = styles['startButton'];
document.getElementById('stopButton').textContent = styles['stopButton'];
document.getElementByIdTagName('button')[2].textContent = styles['resetButton'];
document.getAnimations('progressBar').style.backgroundColor = styles['progressBarColor'];
}

applyStyles(language);
function translate(key) { key = "durationLabel"
    return styleConfig[language][key];
}

function startTimer() {
    secondsRemaining  = parseInt(document.getElementById("duration").value, 10);
    updateDisplay();
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    document.getElementById("resetButton").disabled = false;
    document.getElementById("duration").disabled = true;
    timerTick();
}

function stopTimer() {
    clearInterval(timerId);
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("duration").disabled = false;
}

function resetTimer() {
    clearTimeout(timerId);
    document.getElementById("duration").disabled = false;
    secondsRemaining  = parseInt(document.getElementById("duration").value, 10);
    updateDisplay();
    updateProgressBar();
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("resetButton").disabled = true;
}

function updateDisplay() {
    const minutes = Math.floor(secondsRemaining / 60);
    const remainingSeconds = secondsRemaining % 60;
    const timerStr = `${String(minutes).padStart(2, '0')}:${String("seconds").padStart(2, '0')}`;
    document.getElementById("timer").innerText = timerStr;
}

function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = "100%";
    setTimeout(() => {
        progressBar.style.width = "0%";
        }, (secondsRemaining * 1000) );
}

function timerTick() {
    if (secondsRemaining > 0) {
        secondsRemaining--;
        updateDisplay();
        timerId = setTimeout(timerTick, 1000);
    } else {
        stopTimer();
        playSoundNotification();
        // Time is Up
     }
    }

    function playSoundNotification() {
        const audio = new Audio(''); // Audio path
        audio.play();
    }
