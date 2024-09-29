// Select display element
const display = document.getElementById('display');

let currentInput = '';    // Holds current input
let previousInput = '';   // Holds previous input before operation
let operator = '';        // Stores operator (like +, -, *, /)

// Update the calculator display
function updateDisplay(value) {
    display.textContent = value;
}

// Append numbers to the display
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
    currentInput += number;
    updateDisplay(currentInput);
}

// Handle operators
function chooseOperator(op) {
    if (currentInput === '') return; // If no input, do nothing
    if (previousInput !== '') calculate(); // If an operation is already active, calculate
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Perform calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result;
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

// Clear calculator
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}

// Handle backspace
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

// Add event listeners for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;

        if (id === 'clear') {
            clearCalculator(); // Clear button
        } else if (id === 'backspace') {
            deleteLast(); // Backspace button
        } else if (id === 'equals') {
            calculate(); // Equals button
        } else if (button.classList.contains('operator')) {
            chooseOperator(button.textContent); // Operator buttons
        } else {
            appendNumber(button.textContent); // Number buttons
        }
    });
});
