import { isOperator } from "./checkInfixed";

function evaluate(operandA, operator, operandB) {
  switch (operator) {
    case "+":
      return operandA + operandB;
    case "-":
      return operandA - operandB;
    case "*":
      return operandA * operandB;
    case "/":
      return operandA / operandB;
    default:
      return null;
  }
}

export default function evaluatePostfix(expressionArr) {
  const values = [];
  let operandA = null;
  let operandB = null;
  for (const token of expressionArr) {
    if (isOperator(token)) {
      operandB = values.pop();
      operandA = values.pop();
      values.push(evaluate(operandA, token, operandB));
    } else {
      values.push(token);
    }
  }
  return values.pop();
}