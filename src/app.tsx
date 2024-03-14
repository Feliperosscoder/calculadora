import "./app.css";

import {Textfit} from "react-textfit";

import { useState } from "react";
import { Button } from "./components/button";

export function App() {
  const [data, setData] = useState({ operation: "", result: "" });
  const operation = ["+", "-", "*", "/", "%", "."];

  function handleTyping(event: string) {
    if (data.operation.length > 30) return;
    if (data.operation === "Error") {
      return setData({ ...data, operation: event });
    }

    const lastChar = data.operation[data.operation.length - 1];
    const isLastCharOperator = operation.includes(lastChar);

    console.log();
    if (isLastCharOperator && event === "." && lastChar !== ".") {
      setData({ ...data, operation: `${data.operation}${event}` });
      return;
    }
    if (isLastCharOperator && operation.includes(event)) return;
    if (
      data.operation.length === 0 &&
      operation.some((operator) => operator === event) &&
      event !== "."
    )
      return;

    if (data.operation.includes("Error"))
      setData({ ...data, operation: event as string });
    if (
      data.result !== "" &&
      data.operation === "" &&
      operation.includes(event)
    ) {
      setData({ ...data, operation: `${data.result}` + event });
    }

    setData({ ...data, operation: `${data.operation}` + event });
  }

  function handleDelete() {
    setData((prevData) => {
      const newOperation = prevData.operation.slice(
        0,
        prevData.operation.length - 1
      );
      const newResult = newOperation === "" ? "" : prevData.result;

      return {
        ...prevData,
        operation: newOperation,
        result: newResult,
      };
    });
  }

  function handleClear() {
    setData({ operation: "", result: "" });
  }

  function handleResult() {
    if (data.operation === "") return;
    try {
      let result;
      if (data.operation.includes("%")) {
        while (data.operation.includes("%")) {
          const parts = data.operation.split("%");
          const expression = parts[0];

          let operatorIndex = -1;
          const operation = ["+", "-", "*", "/"];

          for (let i = expression.length - 1; i >= 0; i--) {
            if (operation.includes(expression[i])) {
              operatorIndex = i;
              break;
            }
          }

          if (operatorIndex !== -1) {
            const percentageNumber = parseFloat(
              expression.slice(operatorIndex + 1)
            );

            const rest = expression.slice(0, operatorIndex);
            result = eval(`${rest}`);

            let percent = eval(`${result} * ${percentageNumber}/100`);

            if (
              expression[operatorIndex] === "*" ||
              expression[operatorIndex] === "/"
            ) {
              percent = "1/2";
            }

            const newOperation = data.operation.replace(
              `${percentageNumber}%`,
              `${percent}`
            );

            data.operation = newOperation;

            result = eval(
              `${result}${expression[operatorIndex]}(${percent})${parts[1]}`
            );

            setData({ ...data, result });
          }
        }
      } else {
        result = eval(data.operation);
        setData({ ...data, result });
      }
    } catch (error) {
      setData({ ...data, operation: "Error" });
    }
  }

  return (
    <div className="calculator">
      <div className="display">
        <div className="match-numbers">
          <Textfit mode="single" max={70}>
            {data.operation}
          </Textfit>
        </div>
        <div className="result">
          <Textfit mode="single" max={70}>
            {data.result}
          </Textfit>
        </div>
      </div>
      <div className="buttons">
        <Button text="AC" tipo="operation ac" handleClick={handleClear} />
        <Button text="/" tipo="operation divide" handleClick={handleTyping} />
        <Button
          text="*"
          tipo="operation multiplier"
          handleClick={handleTyping}
        />
        <Button text="%" tipo="operation percent" handleClick={handleTyping} />

        <Button text="7" tipo="numbers seven" handleClick={handleTyping} />
        <Button text="8" tipo="numbers eight" handleClick={handleTyping} />
        <Button text="9" tipo="numbers nine" handleClick={handleTyping} />
        <Button text="C" tipo="operation delete" handleClick={handleDelete} />

        <Button text="4" tipo="numbers four" handleClick={handleTyping} />
        <Button text="5" tipo="numbers five" handleClick={handleTyping} />
        <Button text="6" tipo="numbers six" handleClick={handleTyping} />
        <Button text="-" tipo="operation minus" handleClick={handleTyping} />

        <Button text="1" tipo="numbers one" handleClick={handleTyping} />
        <Button text="2" tipo="numbers two" handleClick={handleTyping} />
        <Button text="3" tipo="numbers three" handleClick={handleTyping} />
        <Button text="+" tipo="operation plus" handleClick={handleTyping} />
        <Button text="." tipo="numbers comma" handleClick={handleTyping} />
        <Button text="0" tipo="numbers zero" handleClick={handleTyping} />
        <Button text="=" tipo="equal" handleClick={handleResult} />
      </div>
    </div>
  );
}
