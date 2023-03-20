import { ArrowLeft, ArrowRight } from "phosphor-react";
import React, { useState } from "react";

export function Month() {
  const [month, setMonth] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  function handleNextMonth() {
    const nextMonth = new Date(month);
    nextMonth.setMonth(month.getMonth() + 1);
    setMonth(nextMonth);
    setCurrentMonth(nextMonth.getMonth());
  }

  function handlePreviousMonth() {
    const previousMonth = new Date(month);
    previousMonth.setMonth(month.getMonth() - 1);
    setMonth(previousMonth);
    setCurrentMonth(previousMonth.getMonth());
  }

  // get month short string
  const monthShort = month.toLocaleString("default", { month: "short" });


  return (
    <div className="flex items-center gap-4">
      <button onClick={handlePreviousMonth} className="">
        <ArrowLeft
          size={26}
          className="hover:scale-125 transition-transform duration-800 cursor-pointer"
        />
      </button>
      <div className="flex flex-col justify-center items-center w-14">
        <span className="text-2xl font-bold">{monthShort}</span>
        <span className="text-sm">{month.getFullYear()}</span>
      </div>
      <button onClick={handleNextMonth} className="">
        <ArrowRight
          size={26}
          className="hover:scale-125 transition-transform duration-800 cursor-pointer"
        />
      </button>
    </div>
  );
}
