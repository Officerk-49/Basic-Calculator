const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const decimal = document.querySelector("#decimal");
const remove = document.querySelector('#remove');

let firstNumber = '';
let operator = null;
let secondNumber = '';

function appendNumber() {
   numbers.forEach(number => {
      number.addEventListener("click", () => {
         if (justCalculated) {
            display.textContent = '';
            firstNumber = '';
            secondNumber = '';
            operator = null;
            justCalculated = false;
         }
         display.textContent += number.textContent;
         if (operator === null) {
            firstNumber += number.textContent;
         } else {
            secondNumber += number.textContent;
         }
      })
   })
}
appendNumber()

function chooseOperator() {
   operators.forEach(opButton => {
      opButton.addEventListener("click", () => {
         let newOperator = opButton.textContent;
         if (secondNumber === '' && operator === null) {
            operator = newOperator;
            display.textContent += operator;
         } else {
            if (firstNumber !== '' && secondNumber !== '' && operator !== null) {
               let result = calculate();
               firstNumber = result;
               secondNumber = '';
               display.textContent = firstNumber;
               operator = newOperator;
               display.textContent += operator;
            }
         }
         if (justCalculated) {
            display.textContent = '';
            firstNumber = '';
            secondNumber = '';
            operator = null;
            justCalculated = false;
         }
      })
   })
}
chooseOperator();

function calculate() {
   switch (operator) {
      case '+':
         return Number(firstNumber) + Number(secondNumber);
      case '-':
         return  Number(firstNumber) - Number(secondNumber);
      case '*':
         return Number(firstNumber) * Number(secondNumber);
      case '/':
         if (Number(secondNumber) === 0) {
            return "Error";
         }
         return Number(firstNumber) / Number(secondNumber);
      default:
         return "Invalid";
   }   
}

let justCalculated = false;

function pressEqual() {
   equal.addEventListener("click", () => {
      let calculation = calculate();
      display.textContent = calculation;
      firstNumber = calculation;
      secondNumber = '';
      operator = null;
      justCalculated = true;
   })
}
pressEqual();

function addDecimal() {
   decimal.addEventListener("click", () => {
      if (operator === null) {
         if (!firstNumber.includes('.')) {
            firstNumber += '.';
            display.textContent += '.';
         }
      } else {
         if (!secondNumber.includes('.')) {
            secondNumber += '.';
            display.textContent += '.';
         }
      }
   })
}
addDecimal();

function backSpace() {
   remove.addEventListener("click", () => {
      if (operator === null) {
         if (firstNumber !== '') {
            firstNumber = firstNumber.slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
         }
      } else {
         if (secondNumber !== '') {
            secondNumber = secondNumber.slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
         } else if (operator !== null) {
            operator = null;
            display.textContent = display.textContent.slice(0, -1);
         }
      }
   });
}
backSpace()

function clearDisplay() {
   clear.addEventListener("click", () => {
      display.textContent = '';
      firstNumber = '';
      secondNumber = '';
      operator = null;
   })
}
clearDisplay();
