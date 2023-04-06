"use client";
import { Category, Entry } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import { Toggle } from "./Toggle";

interface NewEntryProps {
  entries: Entry[];
  session: any;
  categories: Category[];
}

interface FormDataProps {
  amount: number | string;
  type: string;
  typeAccount: string;
  notes?: string;
  description?: string;
  location?: string;
  bankAccount?: string;
  recurring?: string;
  paymentMethod?: string;
  createdAt?: Date;
  categories: number | string;
}

export function NewEntry({ categories, entries, session }: NewEntryProps) {
  const [expense, setExpense] = useState(false);
  const [income, setIncome] = useState(true);
  const [corporativo, setCorporativo] = useState(false);
  const [pessoal, setPessoal] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [formData, setFormData] = useState<FormDataProps>({
    amount: "",
    type: "",
    typeAccount: "",
    notes: "",
    description: "",
    location: "",
    bankAccount: "",
    recurring: "",
    paymentMethod: "",
    createdAt: new Date(),
    categories: Number(0),
  });

  function getUserIdByEmail() {
    const userIdSession = entries
      .filter((entry: any) => entry.User?.email === session?.user?.email)
      .map((entry: any) => entry.userId);
    return String(userIdSession)
      .split(",")
      .filter((value, index, array) => array.indexOf(value) === index)[0];
  }

  function createEntry() {
    fetch(`/api/entries/create-entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: formData.amount,
        type: formData.type ? formData.type : "EXPENSE",
        typeAccount: formData.typeAccount
          ? formData.typeAccount
          : "CORPORATIVO",
        notes: formData.notes,
        description: formData.description,
        bankAccount: formData.bankAccount,
        recurring: formData.recurring,
        paymentMethod: formData.paymentMethod,
        createdAt: formData.createdAt
          ? formData.createdAt
          : new Date().toISOString(),
        userId: getUserIdByEmail(),
        categories: {
          connect: {
            id: Number(formData.categories),
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  }

  function createCategory() {
    fetch(`/api/categories/createCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: categoryName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
      });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    createEntry();
  }

  function toggleExpenseIncome() {
    setExpense(!expense);
    setIncome(!income);
    if (expense) {
      setFormData({
        ...formData,
        type: "EXPENSE",
      });
      console.log({ expense });
    } else {
      setFormData({
        ...formData,
        type: "INCOME",
      });
      console.log({ income });
    }
  }

  function toggleCorporativoPessoal() {
    setCorporativo(!corporativo);
    setPessoal(!pessoal);
    if (corporativo) {
      setFormData({
        ...formData,
        typeAccount: "CORPORATIVO",
      });
      console.log({ corporativo });
    } else {
      setFormData({
        ...formData,
        typeAccount: "PESSOAL",
      });
      console.log({ pessoal });
    }
  }

  return (
    <div className="w-full max-w-sm md:max-w-5xl mt-10 md:mt-0 mx-auto bg-white/50 px-4 md:px-8 pb-4 backdrop-blur-sm rounded-xl shadow-lg">
      <header className="flex flex-col gap-2 md:flex-row w-full items-center justify-between border-b py-6 ">
        <div className="">
        <h2 className="text-2xl font-bold w-full max-w-sm text-zinc-800">
          New Entry
        </h2>
        <p className="text-zinc-800">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus fugit omnis laboriosam tenetur beatae sequi nam maiores pariatur.</p>
        </div>
        <div className="w-full max-w-sm flex flex-col text-center">
          <div className="w-full bg-white h-auto shadow flex flex-col p-4 rounded-xl">
            <h1 className="text-zinc-600 font-bold text-xl">Tipo da Entrada</h1>
            <hr className="my-2" />
            <div className="w-full h-full flex gap-2 flex-col items-center">
              <div className="flex w-full mt-2 items-center border rounded-full overflow-hidden ">
                <button
                  onClick={toggleCorporativoPessoal}
                  className={`
            w-full px-8 py-1 transition-all duration-700 bg-white text-sm
            ${pessoal ? "font-bold bg-zinc-900 text-zinc-100" : "bg-zinc-100 text-zinc-500"}
            `}
                >
                  CORPORATIVO
                </button>
                <button
                  onClick={toggleCorporativoPessoal}
                  className={`
            w-full px-8 py-1 transition-all duration-700 text-sm
            ${corporativo ? "font-bold bg-zinc-900 text-zinc-100" : "bg-zinc-100 text-zinc-500"}
            `}
                >
                  PESSOAL
                </button>
              </div>
              <div className="flex items-center w-full border rounded-full overflow-hidden ">
              <button
                  onClick={toggleExpenseIncome}
                  className={`
            w-full px-8 py-1 transition-all duration-500 text-sm
            ${expense ? "font-bold bg-zinc-900 text-zinc-100" : "bg-zinc-100 text-zinc-500"}
            `}
                >
                  INCOME
                </button>
                <button
                  onClick={toggleExpenseIncome}
                  className={`
            w-full px-8 py-1 transition-all duration-700 bg-white text-sm
            ${income ? "font-bold bg-zinc-900 text-zinc-100" : "bg-zinc-100  text-zinc-500"}
            `}
                >
                  EXPENSE
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="w-full md:w-1/2">Left</div>
        <div className="w-full md:w-1/2">Right</div>
      </div>
    </div>
  );
}
