"use client";
import { Category, Entry } from "@prisma/client";
import React, { FormEvent, useState } from "react";

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
          <p className="text-zinc-800">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            fugit omnis laboriosam tenetur beatae sequi nam maiores pariatur.
          </p>
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
            ${
              pessoal
                ? "font-bold bg-zinc-900 text-zinc-100"
                : "bg-zinc-100 text-zinc-500"
            }
            `}
                >
                  CORPORATIVO
                </button>
                <button
                  onClick={toggleCorporativoPessoal}
                  className={`
            w-full px-8 py-1 transition-all duration-700 text-sm
            ${
              corporativo
                ? "font-bold bg-zinc-900 text-zinc-100"
                : "bg-zinc-100 text-zinc-500"
            }
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
            ${
              expense
                ? "font-bold bg-zinc-900 text-zinc-100"
                : "bg-zinc-100 text-zinc-500"
            }
            `}
                >
                  INCOME
                </button>
                <button
                  onClick={toggleExpenseIncome}
                  className={`
            w-full px-8 py-1 transition-all duration-700 bg-white text-sm
            ${
              income
                ? "font-bold bg-zinc-900 text-zinc-100"
                : "bg-zinc-100  text-zinc-500"
            }
            `}
                >
                  EXPENSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 md:flex-row mt-4 md:divide-x-2">
          <div className="w-full md:w-1/2 flex flex-col gap-4 px-2">
            <div className="flex w-full justify-between items-center gap-2">
              <input
                type="number"
                placeholder="Valor"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: Number(e.target.value),
                  })
                }
                className="rounded-md border border-gray-300 p-2 w-1/2"
              />
              <input
                type="date"
                placeholder="Data"
                value={
                  formData.createdAt
                    ? new Date(formData.createdAt).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    createdAt: new Date(e.target.value),
                  })
                }
                className="rounded-md border border-gray-300 p-2 w-1/2"
              />
            </div>
            <div className="flex w-full flex-col">
              <input
                type="text"
                placeholder="Descrição"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div className="flex w-full flex-col">
              <input
                type="text"
                placeholder="Local"
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex w-full flex-col">
                <select
                  name="bankAccount"
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankAccount: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-gray-300 p-2  text-gray-500"
                >
                  <option value="">Conta</option>
                  <option value="Banco Milleniun">Millenium</option>
                  <option value="ActivoBanck">Activo Bank</option>
                </select>
              </div>

              <div className="flex w-full flex-col">
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentMethod: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-500"
                >
                  <option value="">Metodo de Pagamento</option>
                  <option value="Crédito">Crédito</option>
                  <option value="Débito">Débito</option>
                  <option value="Especies">Especies</option>
                </select>
              </div>
            </div>
            <div className="flex w-full flex-col">
              <select
                name="recurring"
                id="recurring"
                value={formData.recurring}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recurring: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 p-2 text-gray-500"
              >
                <option value="">Recorrência</option>
                <option value="FIXED">Fixa</option>
                <option value="VARIABLE">Váriavel</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between gap-4 px-4">
            
              <fieldset className="border p-2">
                <legend className="text-zinc-800 text-xl font-bold">Categoria</legend>
                <div className="flex flex-col gap-2">
                  <div className="flex items-start flex-wrap gap-2">
                    {categories.map((category: Category) => (
                      <div
                        key={category.id}
                        className="flex items-center gap-2 border p-2 rounded-lg bg-zinc-50"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={formData.categories === category.id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              categories: e.target.value,
                            })
                          }
                        />
                        <label>{category.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>
              <div className="w-full mt-4">
                <button
                  type="button"
                  className="w-full bg-zinc-900 text-zinc-100 px-4 py-2 rounded-md"
                >
                  Criar Categoria
                </button>
              </div>
           
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-zinc-900 text-zinc-100 px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
