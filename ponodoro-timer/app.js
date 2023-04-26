/**
 * cache the elements
 */
const timerDisplay = document.getElementById('timer');
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');

let isWorkSession = true;
let isRuning = true;
let interval;
let minutes = 25;
let seconds = 0;

const pad = (number) => {
    return number < 10 ? '0' + number : number;
}

const updateDisplay = () => {
    timerDisplay.textContent = `${pad(minutes)}: ${pad(seconds)}`;
    timerDisplay.classNmae = isWorkSession ? 'work-session' : 'break-session';
}

const countdown = () => {
    if (seconds == 0 && minutes === 0) {
        isWorkSession = !isWorkSession;
        minutes = isRuning ? 25 : 0
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59
        } else {
            seconds--;
        }
    }

    updateDisplay();
}

start.addEventListener('click', () => {
    if (!isRuning) {
        interval = setInterval(countdown, 1000);
        isRuning = true;
    }
})

pause.addEventListener('click', () => {
    clearInterval(interval);
    isRuning = false;
})

reset.addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;

    minutes = isWorkSession ? 25 : 5;
    seconds = 0;

    updateDisplay();
})

