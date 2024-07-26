import './style.scss';

// get button elements
let startButtonElement = document.querySelector<HTMLButtonElement>(
  '.stopwatch-buttons .start-button'
);
let stopButtonElement = document.querySelector<HTMLButtonElement>(
  '.stopwatch-buttons .stop-button'
);
let resetButtonElement = document.querySelector<HTMLButtonElement>(
  '.stopwatch-buttons .reset-button'
);

// get stopwatch elements
let hourElement = document.querySelector<HTMLSpanElement>(
  '.stopwatch #hour-hand'
) || { innerHTML: '' };
let minuteElement = document.querySelector<HTMLSpanElement>(
  '.stopwatch #minute-hand'
) || { innerHTML: '' };
let secondElement = document.querySelector<HTMLSpanElement>(
  '.stopwatch #second-hand'
) || { innerHTML: '' };
let milliSecondElement = document.querySelector<HTMLSpanElement>(
  '.stopwatch #millisecond-hand'
) || { innerHTML: '' };

let stopWatchInterval: number | null = null;

let hourHand = 0;
let minuteHand = 0;
let secondHand = 0;
let milliSecondHand = 0;

function incrementTime() {
  // Increment the milliseconds counter
  milliSecondHand += 1;

  // If milliseconds reach 100, reset to 0 and increment the seconds counter
  if (milliSecondHand >= 100) {
    milliSecondHand = 0; // Reset milliseconds
    secondHand += 1; // Increment seconds

    // If seconds reach 60, reset to 0 and increment the minutes counter
    if (secondHand >= 60) {
      secondHand = 0; // Reset seconds
      minuteHand += 1; // Increment minutes

      // If minutes reach 60, reset to 0 and increment the hours counter
      if (minuteHand >= 60) {
        minuteHand = 0; // Reset minutes
        hourHand += 1; // Increment hours
      }
    }
  }

  // Call a function to update the time display in the UI
  displayTimeOnUI(hourHand, minuteHand, secondHand, milliSecondHand);
}
function startStopWatch() {
  if (!stopWatchInterval) {
    stopWatchInterval = setInterval(incrementTime, 10);
  }
}
function stopStopWatch() {
  if (stopWatchInterval) {
    clearInterval(stopWatchInterval);
    stopWatchInterval = null;
  }
}
function resetStopWatch() {
  if (stopWatchInterval) {
    clearInterval(stopWatchInterval);
    stopWatchInterval = null;
  }
  hourHand = 0;
  minuteHand = 0;
  secondHand = 0;
  milliSecondHand = 0;
  displayTimeOnUI(hourHand, minuteHand, secondHand, milliSecondHand);
}
startButtonElement?.addEventListener('click', startStopWatch);
stopButtonElement?.addEventListener('click', stopStopWatch);
resetButtonElement?.addEventListener('click', resetStopWatch);

function displayTimeOnUI(
  hour: number,
  minute: number,
  second: number,
  count: number
) {
  hourElement.innerHTML = `${hour}`.padStart(2, '0');
  minuteElement.innerHTML = `${minute}`.padStart(2, '0');
  secondElement.innerHTML = `${second}`.padStart(2, '0');
  milliSecondElement.innerHTML = `${count}`.padStart(2, '0');
}
