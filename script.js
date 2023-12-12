let countdown;
let timerRunning = false;

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startCountdown(minutes) {
  const startTime = Date.now();
  const endTime = startTime + (minutes * 60 * 1000);

  function updateCountdown() {
    const currentTime = Math.max(0, endTime - Date.now());
    const formattedTime = formatTime(Math.floor(currentTime / 1000));

    document.getElementById('countdown').innerText = formattedTime;

    if (currentTime <= 0) {
      clearInterval(countdown);
      document.getElementById('countdown').innerText = '00:00:00';
      return;
    }
  }

  countdown = setInterval(updateCountdown, 1000);
  updateCountdown();
}

document.getElementById('startButton').addEventListener('click', function() {
  const minutes = parseInt(document.getElementById('minutesInput').value);
  if (isNaN(minutes) || minutes < 0) {
    alert('Please enter a valid number of minutes.');
    return;
  }

  if (!timerRunning) {
    startCountdown(minutes);
    timerRunning = true;
  }
});

document.getElementById('resetButton').addEventListener('click', function() {
  clearInterval(countdown);
  document.getElementById('countdown').innerText = '00:00:00';
  document.getElementById('minutesInput').value = '0';
  timerRunning = false;
});

document.getElementById('pauseButton').addEventListener('click', function() {
  clearInterval(countdown);
  timerRunning = false;
});

document.getElementById('minutesInput').addEventListener('input', function() {
  clearInterval(countdown);
  document.getElementById('countdown').innerText = '00:00:00';
  timerRunning = false;
});
