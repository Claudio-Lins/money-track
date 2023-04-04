"use client";
import { Category, EntryProps } from "@/@types/EntryProps";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import { Month } from "./Month";
import { useThemeStore } from "@/store/themeStore";
import { priceFormatter } from "@/utils/formatter";
import { useCurrentMonthStore } from "../store/currentMonthStore";
import { Entry } from "@prisma/client";

interface TableProps {
  entries: EntryProps[]
  session: any
}

export function Summary({
  entries,
  session,
}: TableProps) {
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
  }, [currentMonthTwoDigits, entries, session?.user?.email, typeData]);

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

  return (
    <div className="flex flex-col justify-between w-full md:gap-4">
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
      <div className="flex flex-wrap justify-between flex-col w-full h-[calc(100vh_-_265px)] overflow-hidden md:gap-4 gap-2 rounded-lg md:border">
        <div className="flex w-full items-center md:justify-start px-4 md:divide-x-2 bg-purple-600 text-white shadow-md h-10 justify-between">
          <p className="font-bold text-center text-sm md:text-base md:w-[5%] ">Data</p>
          <p className="font-bold text-center text-sm md:text-base  md:w-[15%] ">Descrição</p>
          <p className="font-bold text-center text-sm md:text-base  md:w-[10%] hidden md:block ">Local</p>
          <p className="font-bold text-center text-sm md:text-base  md:w-[15%] hidden md:block ">
            Forma Pagamento
          </p>
          <p className="font-bold text-center text-sm md:text-base  md:w-[10%] hidden md:block ">Conta</p>
          <p className="font-bold text-center text-sm md:text-base  md:w-[10%] hidden md:block ">Recorrencia</p>
          <p className="font-bold text-center text-sm md:text-base  md:w-[15%] ">Categoria</p>
          <p className="font-bold text-center text-sm md:text-base  md:w-[10%] ">Tipo</p>
          <p className="font-bold text-center text-sm md:text-base  md:w-[10%] ">Valor</p>
        </div>
        <div className="flex w-full md:px-4 flex-col h-auto flex-1 overflow-auto gap-1 items-stretch">
          {entries
            .filter((entry: any) => entry.type === typeData)
            .filter((entry: any) => entry.User?.email === session?.user?.email)
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
              <div
                key={entry.id}
                className={`
          p-2 md:p-1 rounded-lg flex items-center md:divide-x-2 shadow-md justify-between md:justify-start
          ${index % 2 === 0 ? "bg-white" : "bg-purple-100"}
          `}
              >
                <p className="text-xs md:w-[5%] text-center font-semibold">
                  {new Intl.DateTimeFormat("pt-PT", {
                    day: "2-digit",
                    month: "short",
                  }).format(new Date(entry?.createdAt))}
                </p>
                <p className="text-xs md:w-[15%] text-center font-semibold">
                  {entry.description}
                </p>
                <p className="text-xs md:w-[10%] hidden md:block text-center font-semibold">
                  {entry.location}
                </p>
                <p className="text-xs md:w-[15%] hidden md:block text-center font-semibold">
                  {entry.paymentMethod}
                </p>
                <p className="text-xs md:w-[10%] hidden md:block text-center font-semibold">
                  {entry.bankAccount}
                </p>
                <p className="text-xs md:w-[10%] hidden md:block  text-center font-semibold">
                  {entry.recurring}
                </p>
                {entry.categories?.map((category: any) => (
                  <div
                    key={category.id}
                    className="text-xs md:w-[15%] text-center justify-center font-semibold flex items-center gap-2"
                  >
                    <Image
                      className="hidden md:flex"
                      src={category.icon}
                      alt={category.name}
                      width={16}
                      height={16}
                    />
                    <p>{category.name}</p>
                  </div>
                ))}
                {entry.categories.map((category: any) => (
                  <p
                    key={category.id}
                    className="text-xs md:w-[10%] text-center font-semibold"
                  >
                    {category.type}
                  </p>
                ))}

                <p className="text-xs md:w-[10%] text-center font-semibold">
                  {priceFormatter.format(entry.amount)}
                </p>
              </div>
            ))}
        </div>
        {/* {entries
              .filter((entry: any) => entry.type === typeData)
              .filter((entry: any) => entry.User?.email === session?.user?.email )
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
                <div
                  key={entry.id}
                  className={`
                  rounded-md
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                `}
                >
                  <CardEntry
                    date={new Intl.DateTimeFormat("pt-PT", {
                      day: "2-digit",
                      month: 'short'
                    }).format(new Date(entry?.createdAt))}
                    category={entry.categories?.map((category: any) => (
                      <div
                        key={category.id}
                        className={`
                flex items-center gap-1 py-1 px-2 text-zinc-900 text-xs rounded-full
                `}
                      >
                        <Image
                          src={category.icon}
                          alt={category.name}
                          width={16}
                          height={16}
                        />
                        <p>{category.name}</p>
                      </div>
                    ))}
                    place={entry.location}
                    amount={priceFormatter.format(entry.amount)}
                    arrow={entry.type}
                    metodPayment={entry.paymentMethod}
                  />
                </div>
              ))} */}

        <footer className="flex w-full items-center justify-end  bg-white shadow-md h-16 pr-8">
          <h1 className="text-3xl text-zinc-900 drop-shadow-md font-bold text-center">
            {priceFormatter.format(
              typeData === "EXPENSE" ? totalExpenseByMonth : totalByIncomeMonth
            )}
          </h1>
        </footer>
      </div>
    </div>
  );
}
