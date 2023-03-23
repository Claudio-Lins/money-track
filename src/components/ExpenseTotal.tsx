"use client";
import { Category, EntryProps, User } from "@/@types/EntryProps";
import React, { useEffect, useState } from "react";

interface ExpenseProps {
  entries: EntryProps[];
  category: Category[];
  User: User | null;
}

export function ExpenseTotal({ entriesExpense, session }: any) {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const total = entriesExpense
    .filter((entry: any) => entry.User?.email === session?.user?.email )
      .reduce((acc: number, entry: EntryProps) => {
        return acc + entry?.amount;
      }, 0);
    setTotalExpense(total);
  }, [entriesExpense, session?.user?.email]);

  return (
    <div className="p-2 flex items-center">
      <p className="block text-red-700 text-3xl font-extrabold">
        {new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(totalExpense)}
      </p>
    </div>
  );
}
