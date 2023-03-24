"use client";
import { ArrowDown, ArrowUp } from "phosphor-react";
import React from "react";
import { ExpenseTotal } from "../ExpenseTotal";
import { IncomeTotal } from "../IncomeTotal";
import { Total } from "../Total";

export default function TopCards({
  session,
}: any) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <div className="max-w-xs bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
            <ExpenseTotal session={session} />
          <p className="text-red-600">Expense</p>
        </div>
        <div className="flex justify-center items-center p-2 rounded-lg">
          <ArrowDown size={24} weight="bold" color="#bd1313" />
        </div>
      </div>
      <div className="max-w-xs bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
            <IncomeTotal session={session} />
          <p className="text-gray-600">Income</p>
        </div>
        <div className="flex justify-center items-center p-2 rounded-lg">
          <ArrowUp size={24} weight="bold" color="#0fb40c" />
        </div>
      </div>
      <div className="max-w-xs bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
            <Total session={session}/>
          <p className="text-gray-600">Balance</p>
        </div>
      </div>
    </div>
  );
}
