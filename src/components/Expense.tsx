"use client";
import { Category, EntryProps, User } from "@/@types/EntryProps";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ExpenseProps {
  entries: EntryProps[];
  category: Category[];
  User: User | null;
}

export function Expense({ entries, session }: any) {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const total = entries
      .filter((entry: EntryProps) => entry.type === "EXPENSE")
      .reduce((acc: number, entry: EntryProps) => {
        return acc + entry?.amount;
      }, 0);
    setTotalExpense(total);
  }, [entries]);

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">Expense - {session?.user.name}</h2>
      <table className="table-auto">
        <tbody>
        <tr className=" font-bold text-center">
          <td className="border-collapse border border-white p-2">Tipo</td>
          <td className="border-collapse border border-white p-2">Valor</td>
          <td className="border-collapse border border-white p-2">Categoria</td>
          <td className="border-collapse border border-white p-2">Onde</td>
          <td className="border-collapse border border-white p-2">Data</td>
        </tr>
        {entries
          .filter((entry: EntryProps) => entry.type === "EXPENSE")
          .map((entry: EntryProps) => (
            <tr key={entry.id}>
              <td className="border-collapse border border-white p-2 text-sm">
                {entry?.type === "EXPENSE" ? "Expense" : "Income"}
              </td>
              <td className="border-collapse border border-white p-2 text-sm">
                {new Intl.NumberFormat("pt-PT", {
                  style: "currency",
                  currency: "EUR",
                }).format(entry?.amount)}
              </td>
              <td className="border-collapse border border-white p-2 text-sm">
                {entry.category?.map((category) => {
                  return (
                    <div key={category.id} className="flex items-center gap-2">
                      <Image
                        className=""
                        src={category?.icon}
                        alt={category?.name}
                        width={20}
                        height={20}
                        />
                        <p>{category?.name}</p>
                    </div>
                  );
                })}
              </td>
              <td 
                className="border-collapse border border-white p-2 text-sm"
                >
                {entry?.note}
              </td>
              <td className="border-collapse border border-white p-2 text-sm">
                {new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(entry?.updatedAt))}
              </td>
            </tr>
          ))}
          </tbody>
      </table>
      <strong className="mt-2 block">
        Total despesa
        {new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(totalExpense)}
      </strong>
    </div>
  );
}
