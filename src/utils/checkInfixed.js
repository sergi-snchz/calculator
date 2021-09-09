function isOperator(char) {
  return (
    char === "+" || char === "-" || char === "*" || char === "/" || char === "="
  );
}

function isInfixed(str) {
  let operatorStack = [];
  const operandStack = [];
  let minusCounter = 0;
  let iteration = 0;
  let numberOfPoints = 0;
  for (const char of str) {
    if (isOperator(char)) {
      numberOfPoints = 0;
      if (char === "-") {
        minusCounter++;
      }

      if (!operandStack.length) {
        if ((char !== "-") || (minusCounter > 1 && iteration === 1)) {
          return false;
        } 

        if ((char !== "-") || (minusCounter > 2 && iteration > 1)) {
          return false;
        } 
      }

      if (operatorStack.length) {
        if (char !== "-" || minusCounter > 2) {
          return false;
        } 
      }
      operatorStack.push(char);
      operandStack.pop();
    } else {
      minusCounter = 0;
      operandStack.push(char);
      operatorStack = [];
      for (const item of char) {
        if (item === ".") {
          numberOfPoints++;
          if (numberOfPoints > 1) {
            return false;
          }
        }
      }
    }
    iteration++;
  }
  // Check whether the last character is an operator (- + / *)
  if (isOperator(str[str.length - 1])) {
    return false;
  }
  return true;
}

export { isOperator, isInfixed };
