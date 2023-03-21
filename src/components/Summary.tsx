"use client";
import { Category, EntryProps } from "@/@types/EntryProps";
import Image from "next/image";
import { PencilLine, Trash } from "phosphor-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Calendary } from "./Calendary";
import { CardEntry } from "./CardEntry";
import { Month } from "./Month";
import { useThemeStore } from "@/store/themeStore";
import { priceFormatter } from "@/utils/formatter";
import { useCurrentMonthStore } from '../store/currentMonthStore';

interface TableProps {
  entries: EntryProps[];
  entriesExpense: any
  entriesIncome: any
}

export function Summary({ entries, entriesExpense, entriesIncome }: TableProps) {
  const {currentMonth, setCurrentMonth, currentYear, currentDay} = useCurrentMonthStore()
  const { theme, setTheme } = useThemeStore();
  const [typeData, setTypeData] = useState("INCOME");
  const [income, setIncome] = useState(true);
  const [expense, setExpense] = useState(false);
  const [totalExpenseByMonth, setTotalExpenseByMonth] = useState(0)
  const [totalByIncomeMonth, setTotalIncomeByMonth] = useState(0)
  const [total, setTotal] = useState(0)
  
  const currentMonthTwoDigits = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;

  useEffect(() => {
    const totalExpense = entries
      .filter((entry) => entry.type === "EXPENSE")
      .filter((entry: any) => new Intl.DateTimeFormat("pt-PT", {
        month: "2-digit"
      }).format(new Date(entry?.createdAt)).slice(0, 4).includes(String(currentMonthTwoDigits)))
      .reduce((acc, entry) => acc + entry.amount, 0);
      setTotalExpenseByMonth(totalExpense);
  }, [currentMonthTwoDigits, entries, typeData]);

  useEffect(() => {
      const totalIncome = entries
        .filter((entry) => entry.type === "INCOME")
        .filter((entry: any) => new Intl.DateTimeFormat("pt-PT", {
          month: "2-digit"
        }).format(new Date(entry?.createdAt)).slice(0, 4).includes(String(currentMonthTwoDigits)))
        .reduce((acc, entry) => acc + entry.amount, 0);
        setTotalIncomeByMonth(totalIncome);
  }, [currentMonthTwoDigits, entries, typeData]);

  function toggleTypeData() {
    setIncome(!income);
    setExpense(!expense);
    if(income) {
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

  return (
    <div className="flex flex-col w-full gap-4">
      <header className="w-full flex justify-center items-center border-b pb-4">
        <h1 className="text-5xl text-zinc-900 drop-shadow-md font-bold text-center w-11/12">
          {priceFormatter.format(
           typeData === 'EXPENSE' ? totalExpenseByMonth : totalByIncomeMonth)}
        </h1>
        
        <div className="flex-1">
          <Calendary />
        </div>
      </header>
      <div className="w-full justify-center flex">
        <div className="flex items-center border rounded-full overflow-hidden ">
          <button
            onClick={toggleTypeData}
            className={`
            w-full px-8 py-1 transition-all duration-500
            ${expense ? "font-bold bg-zinc-900 text-white" : ""}
            `}
            >
            EXPENSE
          </button>
          <button
            onClick={toggleTypeData}
            className={`
            w-full px-8 py-1 transition-all duration-500
            ${income ? "font-bold bg-zinc-900 text-white" : ""}
            `}
            >
            INCOME
          </button>
        </div>
      </div>
      <div className="w-full justify-center flex">
        <Month/>
      </div>
      <div className="flex flex-wrap justify-center w-full gap-4 rounded-lg px-2 py-4">
        {entries
          .filter((entry: any) => entry.type === typeData)
          .filter((entry: any) => entry.createdAt.slice(0, 4).includes(currentYear))
          .filter((entry: any) => new Intl.DateTimeFormat("pt-PT", {
            month: "2-digit"
          }).format(new Date(entry?.createdAt)).slice(0, 4).includes(String(currentMonthTwoDigits)))
          .map((entry: any) => (
            <div key={entry.id} className="">
            <CardEntry
              date={new Intl.DateTimeFormat("pt-PT", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(entry?.createdAt))}
              category={entry.categories?.map((category: any) => (
                <div key={category.id} className={`
                flex items-center gap-1 py-1 px-2 text-zinc-900 text-xs rounded-full
                `}>
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={16}
                    height={16}
                  />
                  <p>{category.name}</p>
                </div>
              ))}
              place={entry.note}
              amount={
                priceFormatter.format(entry.amount)
              }
              arrow={entry.type}
            />
            </div>
          ))}
      </div>
    </div>
  );
}
