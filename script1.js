
let startTime, updatedTime, difference, tInterval;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const clearAllButton = document.getElementById('clearAll');
const laps = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
clearAllButton.addEventListener('click', clearAllLaps);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        startStopButton.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        laps.appendChild(lapTime);
    }
}

function clearAllLaps() {
    laps.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.textContent = (hours < 10 ? "0" + hours : hours) + ':' +
                          (minutes < 10 ? "0" + minutes : minutes) + ':' +
                          (seconds < 10 ? "0" + seconds : seconds);
}
