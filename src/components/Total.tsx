"use client";
import useEntryExpenseStore from "@/store/entriesExpenseStore";
import useEntryIncomeStore from "@/store/entriesIncomeStore";
import { priceFormatter } from "@/utils/formatter";
import React, { useEffect, useState } from "react";

export function Total({ session }: any) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const { entriesExpense, setEntriesExpense } = useEntryExpenseStore();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/entries/entriesExpense");
      const data = await response.json();
      setEntriesExpense(data);
    };
    fetchData();
  }, [setEntriesExpense]);

  const { entriesIncome, setEntriesIncome } = useEntryIncomeStore();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/entries/entriesIncome");
      const data = await response.json();
      setEntriesIncome(data);
    };
    fetchData();
  }, [setEntriesIncome]);

  useEffect(() => {
    const total = entriesIncome
      .filter((entry: any) => entry.User?.email === session?.user?.email)
      .reduce((acc: number, entry: any) => {
        return acc + entry?.amount;
      }, 0);
    setTotalIncome(total);
  }, [entriesIncome, session?.user?.email]);
  useEffect(() => {
    const total = entriesExpense
      .filter((entry: any) => entry.User?.email === session?.user?.email)
      .reduce((acc: number, entry: any) => {
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
        {priceFormatter.format(total)}
      </strong>
    </div>
  );
}
