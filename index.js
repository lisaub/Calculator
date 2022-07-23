function add(value1,value2) {
  let result=value1+value2;
  return result
}

function subtract(value1,value2) {
  let result=value1-value2;
  return result
}

function multiply(value1,value2) {
  let result=value1*value2;
  return result
}

function divide(value1,value2) {
  let result=value1/value2;
  return result
}

function operate(value1,value2,operator) {
  if (operator==='+') {
    return add(value1,value2)
  }
  if (operator==='-') {
    return subtract(value1,value2)
  }
  if (operator==='*') {
    return multiply(value1,value2)
  }
  if (operator==='/') {
    if(value2 === 0) {
        return 'inf';
    } else {
    return Math.round(divide(value1,value2))
    } 
  }
}

// function display(displayVal) {
//   //document.getElementById('result').value += val
//   return displayVal
// }

let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
const buttons = document.querySelectorAll('button');

function updateDisplay() {
  const display = document.getElementById('result');
  display.innerText = displayValue;
  if(displayValue.length > 9) {
      display.innerText = displayValue.substring(0, 9);
  }
}

function clickButton() {
  for(let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function() {
          if(buttons[i].classList.contains('operand')) {
              inputOperand(buttons[i].value);
              updateDisplay();
          } else if(buttons[i].classList.contains('operator')) {
              inputOperator(buttons[i].value);
          } else if(buttons[i].classList.contains('equals')) {
              inputEquals();
              updateDisplay();
          } else if(buttons[i].classList.contains('sign')) {
              inputSign(displayValue);
              updateDisplay();
          } else if(buttons[i].classList.contains('clear'))
              clearDisplay();
              updateDisplay();
      }
  )}
}

clickButton();

function inputOperand(operand) {
  if(firstOperator === null) {
      if(displayValue === '0' || displayValue === 0) {
          //1st click - handles first operand input
          displayValue = operand;
      } else if(displayValue === firstOperand) {
          //starts new operation after inputEquals()
          displayValue = operand;
      } else {
          displayValue += operand;
      }
  } else {
      //3rd/5th click - inputs to secondOperand
      if(displayValue === firstOperand) {
          displayValue = operand;
      } else {
          displayValue += operand;
      }
  }
}

function inputOperator(operator) {
  if(firstOperator !== null && secondOperator === null) {
      //4th click - handles input of second operator
      secondOperator = operator;
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
      displayValue = result;
      firstOperand = displayValue;
      result = null;
  } else if(firstOperator !== null && secondOperator !== null) {
      //6th click - new secondOperator
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
      secondOperator = operator;
      displayValue = result;
      firstOperand = displayValue;
      result = null;
  } else { 
      //2nd click - handles first operator input
      firstOperator = operator;
      firstOperand = displayValue;
  }
}

function inputEquals() {
  //hitting equals doesn't display undefined before operate()
  if(firstOperator === null) {
      displayValue = displayValue;
  } 
  // else if (firstOperator !== null && displayValue!= null && secondOperand === null) {
  //     displayValue = '0';
  //     firstOperand = null;
  //     secondOperand = null;
  //     firstOperator = null;
  //     secondOperator = null;
  //     result = null;
  // }  
  else if (firstOperator!= null && secondOperator === null ) {
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
      if(result === 'inf') {
        displayValue = 'inf';
      } else {
        displayValue = result;
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
      }
  }
    else if(secondOperator != null) {
      //handles final result
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
      if(result === 'inf') {
          displayValue = 'inf';
      } else {
          displayValue = result;
          firstOperand = displayValue;
          secondOperand = null;
          firstOperator = null;
          secondOperator = null;
          result = null;
      }
  } else {
      //handles first operation
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
      if(result === 'inf') {
          displayValue = 'inf';
      } else {
          displayValue = result;
          firstOperand = displayValue;
          secondOperand = null;
          firstOperator = null;
          secondOperator = null;
          result = null;
      }
  }
}

// function solve() {
//   let x = document.getElementById('result').value
//   ///let y = eval(x);
//   let y=0;

//   if (x.includes("+")) {
//     const myArray = x.split("+");
//     console.log(myArray)
//     y = operate("+",parseInt(myArray[0]), parseInt(myArray[1]));
//   }
//   if (x.includes("-")) {
//     const myArray = x.split("-");
//     console.log(myArray)
//     y = operate("-",parseInt(myArray[0]), parseInt(myArray[1]));
//   }
//   if (x.includes("*")) {
//     const myArray = x.split("*");
//     console.log(myArray)
//     y = operate("*",parseInt(myArray[0]), parseInt(myArray[1]));
//   }
//   if (x.includes("/")) {
//     const myArray = x.split("/");
//     console.log(myArray)
//     y = operate("/",parseInt(myArray[0]), parseInt(myArray[1]));
//   }
//   document.getElementById('result').value = y
//   return y
// }

function inputSign(num) {
  displayValue = (num * -1).toString();
}

function clearDisplay() {
  //document.getElementById('result').value = ''
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function deleteVal() {
  if (displayValue=='inf') {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
  } 
  // else if (displayValue='') {
  //   displayValue = '0';
  //   firstOperand = null;
  //   secondOperand = null;
  //   firstOperator = null;
  //   secondOperator = null;
  //   result = null;
  //   }
  else {
    console.log(typeof displayValue)
    displayValue=String(displayValue);
    console.log(typeof displayValue)
    displayValue=displayValue.slice(0,displayValue.length-1);
    console.log(displayValue);
    console.log(typeof displayValue)
  }
}