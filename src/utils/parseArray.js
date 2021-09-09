import { isOperator } from "./checkInfixed";

export default function parseArr(arr) {
  const parsedExpression = [];
  let operand = "";
  for (let i = 0; i < arr.length; i++) {
    if (isOperator(arr[i])) {
      if (arr[i] === "-") {
        if (i === 0) {
          operand += arr[i];
        } else {
          if (isOperator(arr[i - 1])) {
            operand += arr[i];
          } else {
            parsedExpression.push(arr[i]);
          }
        }
      } else {
        parsedExpression.push(arr[i]);
      }
    } else {
      operand += arr[i];
      parsedExpression.push(parseFloat(operand));
      operand = "";
    }
  } 
  return parsedExpression;  
}