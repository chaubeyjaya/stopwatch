document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startStopBtn = document.getElementById('startStop');
    const resetBtn = document.getElementById('reset');
    const lapBtn = document.getElementById('lap');
    const lapsContainer = document.getElementById('laps');
    
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;
    
    // Format time as HH:MM:SS.mmm
    function formatTime(timeInMillis) {
        const date = new Date(timeInMillis);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    
    // Update the display
    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }
    
    // Start the stopwatch
    function start() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            isRunning = true;
            startStopBtn.textContent = 'Pause';
            startStopBtn.style.backgroundColor = '#f39c12';
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startStopBtn.textContent = 'Resume';
            startStopBtn.style.backgroundColor = '#2ecc71';
        }
    }
    
    // Reset the stopwatch
    function reset() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        updateDisplay();
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#2ecc71';
        lapsContainer.innerHTML = '';
        lapCount = 0;
    }
    
    // Record a lap time
    function lap() {
        if (isRunning || elapsedTime > 0) {
            lapCount++;
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            lapItem.innerHTML = `
                <span class="lap-number">Lap ${lapCount}</span>
                <span class="lap-time">${formatTime(elapsedTime)}</span>
            `;
            lapsContainer.prepend(lapItem);
        }
    }
    
    // Event listeners
    startStopBtn.addEventListener('click', start);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);
    
    // Initialize display
    updateDisplay();
});