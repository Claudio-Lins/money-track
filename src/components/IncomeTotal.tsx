"use client";
import { EntryProps, User } from "@/@types/EntryProps";
import useEntryStore from "@/store/entriesIncomeStore";
import { priceFormatter } from "@/utils/formatter";
import React, { useEffect, useState } from "react";


export function IncomeTotal({ session }: any) {
  const { entriesIncome, setEntriesIncome } = useEntryStore();
  const [totalIncome, setTotalIncome] = useState(0);

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
      .reduce((acc, entry) => {
        return acc + entry.amount;
      }, 0);

    setTotalIncome(total);
  }, [entriesIncome, session?.user?.email]);

  return (
    <>
    <div className="p-2 flex items-center">
      <div className=" text-green-700 text-3xl font-extrabold">
        {priceFormatter.format(totalIncome)}
      </div>
    </div></>
  );
}
