"use client";
import { Category, EntryProps } from "@/@types/EntryProps";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import { Month } from "./Month";
import { useThemeStore } from "@/store/themeStore";
import { priceFormatter } from "@/utils/formatter";
import { useCurrentMonthStore } from "../store/currentMonthStore";
import { useRouter } from "next/navigation";
import { Pencil, Trash } from "phosphor-react";
import { Th } from "./table/Th";
import { Td } from "./table/Td";

interface TableProps {
  entries: EntryProps[];
  session: any;
}

export function Transactions({ entries, session }: TableProps) {
  const { currentMonth, setCurrentMonth, currentYear, currentDay } =
    useCurrentMonthStore();
  const { theme, setTheme } = useThemeStore();
  const [typeData, setTypeData] = useState("INCOME");
  const [income, setIncome] = useState(false);
  const [expense, setExpense] = useState(true);
  const [totalExpenseByMonth, setTotalExpenseByMonth] = useState(0);
  const [totalByIncomeMonth, setTotalIncomeByMonth] = useState(0);
  const [total, setTotal] = useState(0);

  const currentMonthTwoDigits =
    currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;

  const router = useRouter();

  useEffect(() => {
    const totalExpense = entries
      .filter((entry) => entry.type === "EXPENSE")
      .filter((entry: any) => entry.User?.email === session?.user?.email)
      .filter((entry: any) =>
        new Intl.DateTimeFormat("pt-PT", {
          month: "2-digit",
        })
          .format(new Date(entry?.createdAt))
          .slice(0, 4)
          .includes(String(currentMonthTwoDigits))
      )
      .reduce((acc, entry) => acc + entry.amount, 0);
    setTotalExpenseByMonth(totalExpense);
    router.refresh();
  }, [currentMonthTwoDigits, entries, router, session?.user?.email, typeData]);

  useEffect(() => {
    const totalIncome = entries
      .filter((entry) => entry.type === "INCOME")
      .filter((entry: any) => entry.User?.email === session?.user?.email)
      .filter((entry: any) =>
        new Intl.DateTimeFormat("pt-PT", {
          month: "2-digit",
        })
          .format(new Date(entry?.createdAt))
          .slice(0, 4)
          .includes(String(currentMonthTwoDigits))
      )
      .reduce((acc, entry) => acc + entry.amount, 0);
    setTotalIncomeByMonth(totalIncome);
  }, [currentMonthTwoDigits, entries, session?.user?.email, typeData]);

  function toggleTypeData() {
    setIncome(!income);
    setExpense(!expense);
    if (income) {
      setTheme("Expense");
    } else {
      setTheme("Income");
    }
  }

  useEffect(() => {
    if (income) {
      setTypeData("INCOME");
    } else {
      setTypeData("EXPENSE");
    }
  }, [income, expense]);

  useEffect(() => {
    setTotal(totalByIncomeMonth - totalExpenseByMonth);
  }, [totalByIncomeMonth, totalExpenseByMonth]);

  async function handleDelete(id: number) {
    await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });
  }

  function handleEdit() {
    console.log("edit");
  }

  return (
    <>
      <div className="flex flex-col justify-between w-full md:gap-4 mt-4">
        <header className="w-full flex flex-col md:flex-row justify-around items-center border-b pb-4">
          <div className="flex items-center border rounded-full overflow-hidden ">
            <button
              onClick={toggleTypeData}
              className={`
            w-full px-8 py-1 transition-all duration-500 bg-white
            ${expense ? "font-bold bg-zinc-900 text-white" : "bg-white"}
            `}
            >
              EXPENSE
            </button>
            <button
              onClick={toggleTypeData}
              className={`
            w-full px-8 py-1 transition-all duration-500
            ${income ? "font-bold bg-zinc-900 text-white" : "bg-white"}
            `}
            >
              INCOME
            </button>
          </div>
          <Month />
        </header>
        <table className="min-w-full divide-y divide-zinc-100 dark:divide-zinc-700">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <Th>Data</Th>
              <Th>Descrição</Th>
              <Th>Categoria</Th>
              <Th>Valor</Th>
              <th scope="col" className="relative px-4 py-3">
                <span className="md:text-sm text-[10px] font-medium text-zinc-300 uppercase tracking-wider">
                  Ações
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-100 dark:divide-zinc-700 dark:bg-zinc-800">
            {entries
              .filter((entry: any) => entry.type === typeData)
              .filter(
                (entry: any) => entry.User?.email === session?.user?.email
              )
              .filter((entry: any) => entry.amount > 0)
              .filter((entry: any) =>
                entry.createdAt.slice(0, 4).includes(currentYear)
              )
              .filter((entry: any) =>
                new Intl.DateTimeFormat("pt-PT", {
                  month: "2-digit",
                })
                  .format(new Date(entry?.createdAt))
                  .slice(0, 4)
                  .includes(String(currentMonthTwoDigits))
              )
              .map((entry: any, index: number) => (
                <tr
                  key={entry.id}
                  className={`
              ${index % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-700" : "bg-zinc-500"}
              `}
                >
                  <Td>
                    <div className=" md:text-sm text-[10px] text-zinc-900 dark:text-zinc-100">
                      {new Intl.DateTimeFormat("pt-PT", {
                        day: "2-digit",
                        month: "short",
                      }).format(new Date(entry?.createdAt))}
                    </div>
                  </Td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className=" md:text-sm text-[10px] text-zinc-900 dark:text-zinc-100">
                      {entry.description}
                    </div>
                  </td>
                  <Td>
                    <div className=" md:text-sm text-[10px] text-left text-zinc-900 dark:text-zinc-100">
                      {entry.categories?.map((category: any) => (
                        <div
                          key={category.id}
                          className="flex gap-2 items-center  text-zinc-50"
                        >
                          <Image
                            className="hidden md:flex"
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL_ICON}/category-icon/${category.icon}`}
                            alt={category.name}
                            width={16}
                            height={16}
                          />
                          <p>{category.name}</p>
                        </div>
                      ))}
                    </div>
                  </Td>
                  <Td>
                    <div className=" md:text-sm text-[10px] text-zinc-900 font-bold dark:text-zinc-100">
                      {new Intl.NumberFormat("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                      }).format(entry.amount)}
                    </div>
                  </Td>
                  <Td className="md:text-lg text-[10px] font-medium">
                    <div className="flex justify-center gap-2 items-center">
                      <button
                        onClick={() => handleEdit()}
                        className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300"
                      >
                        <Pencil />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300"
                      >
                        <Trash />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="grid grid-cols-5 items-center">
          <div className="col-span-3 text-right pr-8 md:pr-0 text-sm font-semibold md:text-lg">
            Total
          </div>
          <div className="col-span-1">
            <p className="md:text-2xl text-xl text-zinc-900 drop-shadow-md font-bold pr-4 text-center">
              {priceFormatter.format(
                typeData === "EXPENSE"
                  ? totalExpenseByMonth
                  : totalByIncomeMonth
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
