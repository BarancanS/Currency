"use client";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [currencies, setCurrencies] = useState({});
  const [text1, setText1] = useState(1);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const ref = useRef(text1);

  useEffect(() => {
    getApi();
  }, [firstValue, secondValue, text1]);

  const getApi = async () => {
    return fetch(
      "https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP",
      {
        headers: {
          apikey: "cnQzjVDhxL2K5kedT2O9A9SYhgCKr8yC",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data.quotes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSelect(e) {
    setFirstValue(e.target.value);
  }

  function handleSelectSecond(e) {
    setSecondValue(e.target.value);
  }

  function calculate() {
    if (firstValue && secondValue) {
      setTotalValue((secondValue / firstValue) * text1);
    } else {
      setTotalValue(""); // Reset totalValue if either currency is not selected
    }
  }

  function clear() {
    // setTotalValue("");
    // setSecondValue("");
    // setFirstValue("");
    // setText1(1);
    ref.current.value = "";
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-black">
      <h1 className="text-white text-4xl mb-4">Currency App</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <input
            type="number"
            ref={ref}
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="p-2 border rounded-md text-lg text-black"
          />
          <select
            name="currencies"
            className="p-2 border rounded-md text-lg text-black"
            onChange={handleSelect}
          >
            <option value="" selected>
              Select Currency
            </option>
            {Object.keys(currencies).map((currency, index) => {
              return (
                <option key={index} value={currencies[currency]}>
                  {currency}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col-reverse gap-2">
          <input
            type="number"
            ref={ref}
            value={totalValue}
            className="p-2 border rounded-md text-lg text-black"
          />
          <select
            name="currencies"
            className="p-2 border rounded-md text-lg text-black"
            onChange={handleSelectSecond}
          >
            <option value="" selected>
              Select Currency
            </option>
            {Object.keys(currencies).map((currency, index) => {
              return (
                <option key={index} value={currencies[currency]}>
                  {currency}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex flex-row mt-2 gap-2 text-white">
        <button
          onClick={calculate}
          className="bg-blue-800 px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="bg-blue-800 px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Page;
