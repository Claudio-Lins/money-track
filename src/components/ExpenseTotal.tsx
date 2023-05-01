"use client";
import { CategoryProps } from "@/@types/CategoryProps";
import {  EntryProps } from "@/@types/EntryProps";
import { UserProps } from "@/@types/UserProps";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { priceFormatter } from "@/utils/formatter";
import { getServerSession } from "next-auth";
import { ArrowDown } from "phosphor-react";
import React, { useEffect, useState } from "react";
import useEntryStore from "../store/entriesExpenseStore";

interface ExpenseProps {
  entries: EntryProps[];
  category: CategoryProps[];
  User: UserProps | null;
}

export function ExpenseTotal({session}: any) {
  const [totalExpense, setTotalExpense] = useState(0);
  
  const { entriesExpense, setEntriesExpense } = useEntryStore();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`${process.env.BASE_URL}/api/entries/getAllEntries`);
  //     const data = await response.json();
  //     setEntriesExpense(data);
  //   };
  //   fetchData();
  // }, [setEntriesExpense]);

  useEffect(() => {
    const total = entriesExpense
      .filter((entry: any) => entry.User?.email === session?.user?.email)
      .reduce((acc, entry) => {
        return acc + entry.amount;
      }, 0);

    setTotalExpense(total);
  }, [entriesExpense, session?.user?.email]);

  return (
    <div className="p-4 flex items-center gap-2 bg-white shadow-md w-full max-w-xs justify-between rounded-lg">
      <p className="block text-red-700 text-3xl font-extrabold">
        {priceFormatter.format(totalExpense/100)}
      </p>
      <ArrowDown size={24} weight="bold" color="#bd1313" />
    </div>
  );
}
