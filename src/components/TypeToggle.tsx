import React, { useState } from "react";

interface TypeToggleProps {
  typeData: string;
  setTypeData: (typeData: string) => void;
  toggleTypeData: () => void;
  setExpense: (expense: boolean) => void;
  setIncome: (income: boolean) => void;
}

export function TypeToggle({typeData, setTypeData, toggleTypeData, setExpense, setIncome }: TypeToggleProps) {
  const [income] = useState(true);
  const [expense] = useState(false);

  return (
    <div className="flex items-center border rounded-full overflow-hidden ">
      <button
        onClick={toggleTypeData}
        className={`
         w-full px-8 py-1 transition-all duration-500
          ${expense ? "font-bold bg-zinc-900 text-white" : ""}
        `}
      >
        EXPENSE
      </button>
      <button
        onClick={toggleTypeData}
        className={`
        w-full px-8 py-1 transition-all duration-500
        ${income ? "font-bold bg-zinc-900 text-white" : ""}
      `}
      >
        INCOME
      </button>
    </div>
  );
}
