import React, { useState, useEffect } from "react";
import "./App.css";

const buttons = [
  "MC", "MR", "M+", "M-",
  "√", "x²", "%", "C",
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+"
];

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      if ((/[0-9+\-*/.=C]/.test(key)) || key === "Enter") {
        if (key === "Enter") calculate();
        else if (key === "C") clear();
        else handleInput(key);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [input]);

  const handleInput = (value) => {
    if (value === "=") return calculate();
    if (value === "C") return clear();
    if (value === "√") return setInput(Math.sqrt(eval(input || 0)).toString());
    if (value === "x²") return setInput(Math.pow(eval(input || 0), 2).toString());
    if (value === "%") return setInput((eval(input || 0) / 100).toString());
    if (value === "M+") return setMemory(memory + eval(input || 0));
    if (value === "M-") return setMemory(memory - eval(input || 0));
    if (value === "MR") return setInput(memory.toString());
    if (value === "MC") return setMemory(0);

    if (result) {
      setInput(value);
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const calculate = () => {
    try {
      const evalResult = eval(input).toString();
      const fullExpression = `${input} = ${evalResult}`;
      setResult(evalResult);
      setInput(fullExpression);
      setHistory([...history, fullExpression]);
    } catch {
      setResult("Error");
      setInput("Invalid Expression");
    }
  };

  const clear = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="calculator-container">
      <div className="calculator">

        <button className="history-toggle" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "← Back" : "📜 History"}
        </button>

        {showHistory ? (
          <div className="history-view">
            <h3>Calculation History</h3>
            {history.length === 0 ? (
              <p>No history yet.</p>
            ) : (
              <ul>
                {history.slice().reverse().map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <>
            <div className="display">{input || "0"}</div>
            <div className="buttons">
              {buttons.map((btn) => (
                <button key={btn} onClick={() => handleInput(btn)}>
                  {btn}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
