"use client";
import { Category, EntryProps, User } from "@/@types/EntryProps";
import Image from "next/image";
import { ArrowDown } from "phosphor-react";
import React, { useEffect, useState } from "react";

interface ExpenseProps {
  entries: EntryProps[];
  category: Category[];
  User: User | null;
}

export function ExpenseTotal({ entriesExpense }: any) {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const total = entriesExpense
      .reduce((acc: number, entry: EntryProps) => {
        return acc + entry?.amount;
      }, 0);
    setTotalExpense(total);
  }, [entriesExpense]);

  return (
    <div className="p-2 flex items-center">
      <strong className="block text-red-700 text-xl font-extrabold">
        {new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(totalExpense)}
      </strong>
        <ArrowDown weight="bold" size={20} color='rgb(185 28 2)' />
    </div>
  );
}
