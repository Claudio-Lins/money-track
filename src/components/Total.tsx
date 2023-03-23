"use client";
import { EntryProps } from "@/@types/EntryProps";
import React, { useEffect, useState } from "react";

export function Total({ entriesIncome, entriesExpense, session }: any) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const total = entriesIncome
    .filter((entry: any) => entry.User?.email === session?.user?.email )
    .reduce((acc: number, entry: EntryProps) => {
      return acc + entry?.amount;
    }, 0);
    setTotalIncome(total);
  }, [entriesIncome, session?.user?.email]);
  useEffect(() => {
    const total = entriesExpense
    .filter((entry: any) => entry.User?.email === session?.user?.email )
    .reduce((acc: number, entry: EntryProps) => {
      return acc + entry?.amount;
    }, 0);
    setTotalExpense(total);
  }, [entriesExpense, session?.user?.email]);

  const total = totalIncome - totalExpense;

  return (
    <div className="p-2">
      <strong
        className={`
      block font-extrabold text-3xl
      ${total <= 0 ? "text-red-700" : "text-blue-700"}
      `}
      >
        {new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(total)}
      </strong>
    </div>
  );
}
