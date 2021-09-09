import { useState } from "react";
import { isInfixed } from "../utils/checkInfixed";
import parseArr  from "../utils/parseArray"
import shuntingYard from "../utils/shuntingYard";
import evaluatePostfix from "../utils/evaluatePostix";

function App() {
  const [infixNotation, setInfixNotation] = useState("0");
  const [initialLoad, setInitialLoad] = useState(true);
  const [result, setResult] = useState("0");
  const [clearNotation, setClearNotation] = useState(false);

  function isValidKey(key) {
    if ((key.charCodeAt() > 47 && key.charCodeAt() < 58) || key === "." || key === "a" || key === "/" || key === "Backspace" || key.toLowerCase() === "x" || key === "*" || key === "+" || key === "-" || key === "/" || key === "=" || key === "Enter") {
      return true;
    }
    return false;
  }

  function handleKeys(key) {
    if ((initialLoad && isValidKey(key)) || (clearNotation && isValidKey(key))) {
      setInfixNotation("");
      setInitialLoad(false);
    }

    if (isValidKey(key) && (key !== "Enter" || key !== "=")) {
      setClearNotation(false);
    }

    if ((key.charCodeAt() > 47 && key.charCodeAt() < 58) || key === ".") {
      setInfixNotation((value) => value + key);
    } else if (key.toLowerCase() === "a") {
      setInfixNotation("0");
      setInitialLoad(true);
      setResult("0");
    } else if (key === "Backspace") {
      if (infixNotation.length === 1) {
        setInfixNotation("0");
        setInitialLoad(true);
      } else {
        setInfixNotation((value) => value.slice(0, value.length - 1));
      }
    } else if (key === "+" || key === "-" || key === "/") {
      setInfixNotation((value) => `${value} ${key} `);
    } else if (key.toLowerCase() === "x" || key === "*") {
      setInfixNotation((value) => `${value} * `);
    } else if (key === "=" || key === "Enter") {
      setInfixNotation((value) => `${value} =`);
      setClearNotation(true);
      const removeEmptyStrings = infixNotation
        .split(" ")
        .filter((item) => item !== "" && item !== " ");
      if (isInfixed(removeEmptyStrings)) {
        const parsedArr = parseArr(removeEmptyStrings);
        const postFixExpression = shuntingYard(parsedArr);
        const result = evaluatePostfix(postFixExpression);
        setResult(result);
      } else {
        setResult("Syntax Error!");
      }
    }
  }

  function handleButtonClick(event) {
    const target = event.target;
    if (target.localName === "button") {
      let textContent = target.textContent;
      if (textContent === "AC") {
        textContent = "a";
      }
      handleKeys(textContent);
    }
  }

  function handleKeydown(event) {
    const key = event.key;
    if (key === "Enter") {
      event.preventDefault();
    }
    handleKeys(key);
  }

  document.body.classList.add("bg-gray-600");

  return (
    <div
      className="flex items-center h-92vh sm:h-screen"
      onClick={handleButtonClick}
      onKeyDown={handleKeydown}
    >
      <div className="grid grid-cols-4 gap-px h-5/6 p-px text-xl text-gray-50 max-w-sm m max-h-600px mx-auto flex-1">
        <div className="col-span-full text-right bg-black rounded-t">
          <div className="h-1/2 px-3 flex flex-col justify-center">
            {infixNotation}
          </div>
          <div className="h-1/2 px-3 flex flex-col justify-center">
            {result}
          </div>
        </div>
        <button
          autoFocus
          className="col-span-2 bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-gray-50 outline-none"
        >
          AC
        </button>
        <button className="bg-gray-400 hover:bg-gray-700 outline-none">/</button>
        <button className="bg-gray-400 hover:bg-gray-700 outline-none">X</button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">7</button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">8</button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">9</button>
        <button className="bg-gray-400 hover:bg-gray-700 outline-none">-</button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">4</button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">5</button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">6</button>
        <button className="bg-gray-400 hover:bg-gray-700 outline-none">+</button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">1</button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">2</button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">3</button>
        <button className="row-span-2 bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-gray-50 rounded-br outline-none">
          =
        </button>
        <button className="col-span-2 bg-gray-500 hover:bg-gray-700 rounded-bl outline-none">
          0
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 outline-none">.</button>
      </div>
    </div>
  );
}

export default App;
