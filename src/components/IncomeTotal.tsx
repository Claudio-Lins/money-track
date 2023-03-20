"use client";
import { Category, EntryProps, User } from "@/@types/EntryProps";
import { ArrowUp } from "phosphor-react";
import React, { useEffect, useState } from "react";

interface ExpenseProps {
  entries: EntryProps[];
  category: Category[];
  User: User | null;
}


export function IncomeTotal({ entriesIncome }: any) {
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const total = entriesIncome
      .reduce((acc: number, entry: EntryProps) => {
        return acc + entry?.amount;
      }, 0);
      setTotalIncome(total);
  }, [entriesIncome]);

  return (
    <div className="p-2 flex items-center">
      <strong className="block text-green-700 text-xl font-extrabold">
        {new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(totalIncome)}
      </strong>
      <ArrowUp weight="bold" size={20} color='rgb(21 128 61)' />
    </div>
  );
}
