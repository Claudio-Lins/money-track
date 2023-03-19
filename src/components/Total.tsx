"use client";
import { EntryProps } from '@/@types/EntryProps';
import React, { useEffect, useState } from 'react'

export function Total({ entries }: any) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const total = entries
      .filter((entry: EntryProps) => entry.type === "INCOME")
      .reduce((acc: number, entry: EntryProps) => {
        return acc + entry?.amount;
      }, 0);
      setTotalIncome(total);
  }, [entries]);
  useEffect(() => {
    const total = entries
      .filter((entry: EntryProps) => entry.type === "EXPENSE")
      .reduce((acc: number, entry: EntryProps) => {
        return acc + entry?.amount;
      }, 0);
    setTotalExpense(total);
  }, [entries]);

  const total = totalIncome - totalExpense;

  return (
    <div className="p-2">
      <strong className={`
      block font-extrabold text-xl
      ${total <= 0 ? 'text-red-700' : 'text-blue-700'}
      `}>
        
        {new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(total)}
      </strong>
    </div>
  )
}
