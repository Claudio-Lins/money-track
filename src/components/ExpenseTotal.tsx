"use client";
import { Category, EntryProps, User } from "@/@types/EntryProps";
import { priceFormatter } from "@/utils/formatter";
import React, { useEffect, useState } from "react";
import useEntryStore from "../store/entriesExpenseStore";

interface ExpenseProps {
  entries: EntryProps[];
  category: Category[];
  User: User | null;
}

export function ExpenseTotal({ session }: any) {
  const { entriesExpense, setEntriesExpense } = useEntryStore();
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/entries/entriesExpense");
      const data = await response.json();
      setEntriesExpense(data);
    };

    fetchData();
  }, [setEntriesExpense]);

  useEffect(() => {
    const total = entriesExpense
      .filter((entry: any) => entry.User?.email === session?.user?.email)
      .reduce((acc, entry) => {
        return acc + entry.amount;
      }, 0);

    setTotalExpense(total);
  }, [entriesExpense, session?.user?.email]);

  return (
    <div className="p-2 flex items-center">
      <p className="block text-red-700 text-3xl font-extrabold">
        {priceFormatter.format(totalExpense)}
      </p>
    </div>
  );
}
