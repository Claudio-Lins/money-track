"use client";
import { EntryProps, User } from "@/@types/EntryProps";
import React, { useEffect, useState } from "react";


export function IncomeTotal({ entriesIncome, session }: any) {
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const total = entriesIncome
    .filter((entry: any) => entry.User?.email === session?.user?.email )
    .reduce((acc: number, entry: EntryProps) => {
        return acc + entry?.amount;
      }, 0);
      setTotalIncome(total);
  }, [entriesIncome, session?.user?.email]);

  return (
    <>
    <div className="p-2 flex items-center">
      <div className=" text-green-700 text-3xl font-extrabold">
        {new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(totalIncome)}
      </div>
    </div></>
  );
}
