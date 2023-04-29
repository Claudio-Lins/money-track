"use client";

import useEntryStore from "@/store/entriesIncomeStore";
import { priceFormatter } from "@/utils/formatter";
import { ArrowUp } from "phosphor-react";
import React, { useEffect, useState } from "react";


export function IncomeTotal({ session }: any) {
  const [totalIncome, setTotalIncome] = useState(0);
  
  const { entriesIncome, setEntriesIncome } = useEntryStore();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`${process.env.BASE_URL}/api/entries/getAllEntries`);
  //     const data = await response.json();
  //     setEntriesIncome(data);
  //   };
  //   fetchData();
  // }, [setEntriesIncome]);

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
    <div className="p-4 flex items-center gap-2 bg-white shadow-md w-full max-w-xs justify-between rounded-lg">
      <div className=" text-green-700 text-3xl font-extrabold">
        {priceFormatter.format(totalIncome)}
      </div>
      <ArrowUp size={24} weight="bold" color="#0fb40c" />
    </div></>
  );
}
