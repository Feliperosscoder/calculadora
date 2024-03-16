import "./app.css";

import { Textfit } from "react-textfit";

import { useState } from "react";
import { Button } from "./components/button";

export function App() {
  const [data, setData] = useState({ operation: "", result: "" });
  const [isActive, setIsActive] = useState(false);
  const operation = ["+", "-", "*", "/", "%", "."];

  function handleSwitcher() {
    const body = document.querySelector("body");
    const toggle = document.querySelector(".toggle");
    setIsActive(!isActive);
    toggle?.classList.toggle("active");
    body?.classList.toggle("active");
  }

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

    if (event === ".") {
      // Verifica se o último número na expressão já contém um ponto decimal
      const numbersAndOperators = data.operation.split(/[-+*/]/);
      const lastNumber = numbersAndOperators.pop();
      console.log(numbersAndOperators);
      if (lastNumber && lastNumber.includes(".")) {
        // Se o último número já contiver um ponto decimal, não permita adicionar outro
        return;
      }
    }
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
          const operations = ["+", "-", "*", "/"];

          for (let i = expression.length - 1; i >= 0; i--) {
            if (operations.includes(expression[i])) {
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
    <div className={isActive ? "calculator active" : "calculator"}>
      <div className="container-toggle">
        <div className="toggle" onClick={handleSwitcher}>
          <i className="indicator"></i>
        </div>
      </div>
      <div className={isActive ? "display active" : "display"}>
        <div className={isActive ? "match-numbers active" : "match-numbers"}>
          <Textfit mode="single" max={70}>
            {data.operation}
          </Textfit>
        </div>
        <div className={isActive ? "result active" : "result"}>
          <Textfit mode="single" max={70}>
            {data.result}
          </Textfit>
        </div>
      </div>
      <div className="buttons">
        <Button
          text="AC"
          tipo="operation ac"
          handleClick={handleClear}
          isActive={isActive}
        />
        <Button
          text="/"
          tipo="operation divide"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="*"
          tipo="operation multiplier"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="%"
          tipo="operation percent"
          handleClick={handleTyping}
          isActive={isActive}
        />

        <Button
          text="7"
          tipo="numbers seven"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="8"
          tipo="numbers eight"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="9"
          tipo="numbers nine"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="C"
          tipo="operation delete"
          handleClick={handleDelete}
          isActive={isActive}
        />

        <Button
          text="4"
          tipo="numbers four"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="5"
          tipo="numbers five"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="6"
          tipo="numbers six"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="-"
          tipo="operation minus"
          handleClick={handleTyping}
          isActive={isActive}
        />

        <Button
          text="1"
          tipo="numbers one"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="2"
          tipo="numbers two"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="3"
          tipo="numbers three"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="+"
          tipo="operation plus"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="."
          tipo="numbers comma"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="0"
          tipo="numbers zero"
          handleClick={handleTyping}
          isActive={isActive}
        />
        <Button
          text="="
          tipo="equal"
          handleClick={handleResult}
          isActive={isActive}
        />
      </div>
    </div>
  );
}
