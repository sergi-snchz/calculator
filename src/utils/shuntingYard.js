// Helper functions
function operatorPrecedence(operator) {
  return (operator === "+" || operator === "-") ? 1 : 2; 
}

function isOperatorStackEmpty(operatorStack) {
  return operatorStack.length === 0;
}

export default function shuntingYard(expressionArr) {
  const outputQueue = [];
  const operatorStack = [];
  for (const token of expressionArr) {
    if (typeof token === "number") {
      outputQueue.push(token);
    } else {
      while (!isOperatorStackEmpty(operatorStack) && operatorPrecedence(operatorStack[operatorStack.length - 1]) >= operatorPrecedence(token)) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  }
  while (!isOperatorStackEmpty(operatorStack)) {
    outputQueue.push(operatorStack.pop());
  }
  return outputQueue;
}