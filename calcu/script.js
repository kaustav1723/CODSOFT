

const display = document.querySelector('input[name="display"]');

function updateDisplay(value) {
  display.value += value;
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = '';
}

function deleteLastCharacter() {
  display.value = display.value.slice(0, -1);
}

function handleButtonClick(value) {
  if (value === '=') {
    calculate();
  } else if (value === 'AC') {
    clearDisplay();
  } else if (value === 'DE') {
    deleteLastCharacter();
  } else {
    // Prevent consecutive operator inputs
    const lastChar = display.value.slice(-1);
    if (value.match(/[+\-/]/) && lastChar.match(/[+\-/]/)) {
      return;
    }
    updateDisplay(value);
  }
}

const inputButtons = document.querySelectorAll('.calculator div input[type="button"]');
inputButtons.forEach(button => {
  button.addEventListener('click', function() {
    const value = this.value;
    handleButtonClick(value);
  });
});

document.addEventListener('keydown', function(event) {
  const key = event.key;
  const validKeys = "0123456789/*-+.=";
  if (validKeys.includes(key)) {
    event.preventDefault();
    handleButtonClick(key);
  } else if (key === 'Backspace') {
    event.preventDefault();
    deleteLastCharacter();
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  }
});