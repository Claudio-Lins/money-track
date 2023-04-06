"use client";
import { Entry, Recurring } from "@prisma/client";
import { useThemeStore } from "@/store/themeStore";
import { ArrowCircleDown, CurrencyEur, X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "./assets/Button";
import Modal from "./Modal";
import { Category } from "@prisma/client";

interface FormData {
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

interface ModalExpenseProps {
  entries: Entry[];
  session: any;
  categories: Category[];
}

export default function ModalExpense({
  entries,
  session,
  categories,
}: ModalExpenseProps) {
  const [typeData, setTypeData] = useState("INCOME");
  const [expense, setExpense] = useState(false);
  const [income, setIncome] = useState(true);
  const [corporativo, setCorporativo] = useState(false);
  const [pessoal, setPessoal] = useState(true);
  const { theme, setTheme } = useThemeStore();
  const [modalStatus, setModalStatus] = useState(false);
  const [step, setStep] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [formData, setFormData] = useState<FormData>({
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

  // reload page
  function refreshPage() {
    window.location.reload();
  }
  useEffect(() => {
    async function getCategories() {
      const resCategory = await fetch(
        `${process.env.BASE_URL}/api/categories/getAllCategories`
      );
      const categories = await resCategory.json();
      console.log(categories);
    }
    getCategories();
  }, [setCategoryName]);

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
        refreshPage();
      });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    createEntry();
    setModalStatus(false);
  }

  function stepsFunction(step: number) {
    switch (step) {
      case 1:
        setStep(step + 1);
        break;
      case 2:
        setStep(step + 1);
        setModalStatus(true);
        // handleSubmmit()
        break;
      case 3:
      default:
        break;
    }
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
    <div className="w-full">
      <div className="w-full flex justify-center">
        <Button
          onClick={() => {
            setModalStatus(true);
          }}
          type="button"
          cor="green"
          className="w-full max-w-xs"
        >
          <CurrencyEur size={45} weight="bold" />
        </Button>
      </div>
      <Modal status={modalStatus} setStatus={setModalStatus}>
        <div className="w-full flex flex-col justify-center items-center gap-2 relative">
          <div className="absolute -top-6 -right-6">
            <button
              onClick={() => setModalStatus(false)}
              className="w-8 h-8 rounded-lg border flex justify-center items-center"
            >
              <X />
            </button>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            <form onSubmit={onSubmit} className="mt-4 w-full">
              {step === 1 && (
                <div>
                  <h2 className="font-bold text-lg">Entrada de Dados</h2>
                </div>
              )}
              {step === 2 && (
                <div className="flex w-full flex-col gap-2">
                  <span>Selecione a Categoris</span>
                  <select
                    name="categories"
                    id="categories"
                    value={formData.categories}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categories: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-gray-300 p-2 text-gray-500"
                  >
                    <option value="">Categoria</option>
                    {categories?.map((category: Category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <span>Criar Categoria</span>
                  <div>
                    <input
                      type="text"
                      name="categories"
                      id="categories"
                      placeholder="Nome da Categoria"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2 text-gray-500"
                    />
                    <button
                      onClick={createCategory}
                      type="button"
                      className="w-full rounded-md border border-gray-300 p-2 text-gray-500"
                    >
                      Criar
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && <p>Step 3</p>}
            </form>
            {/* <div className="w-full bg-red-500">
                 <div className="flex flex-col items-center justify-between gap-2">
                   <div className="flex items-center border rounded-full overflow-hidden ">
                     <button
                      onClick={toggleExpenseIncome}
                      className={`
            w-full px-8 py-1 transition-all duration-500 bg-white text-sm
            ${income ? "font-bold bg-zinc-900 text-white" : "bg-white"}
            `}
                    >
                      EXPENSE
                    </button>
                    <button
                      onClick={toggleExpenseIncome}
                      className={`
            w-full px-8 py-1 transition-all duration-500 text-sm
            ${expense ? "font-bold bg-zinc-900 text-white" : "bg-white"}
            `}
                    >
                      INCOME
                    </button>
                  </div>
                  <div className="flex items-center border rounded-full overflow-hidden ">
                    <button
                      onClick={toggleCorporativoPessoal}
                      className={`
            w-full px-8 py-1 transition-all duration-500 bg-white text-sm
            ${pessoal ? "font-bold bg-zinc-900 text-white" : "bg-white"}
            `}
                    >
                      CORPORATIVO
                    </button>
                    <button
                      onClick={toggleCorporativoPessoal}
                      className={`
            w-full px-8 py-1 transition-all duration-500 text-sm
            ${corporativo ? "font-bold bg-zinc-900 text-white" : "bg-white"}
            `}
                    >
                      PESSOAL
                    </button>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="mt-4 w-full">
                  <div className="flex flex-col gap-2">
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
                            ? new Date(formData.createdAt)
                                .toISOString()
                                .split("T")[0]
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
                        <option value="milleniun">Millenium</option>
                        <option value="activo">Activo Bank</option>
                      </select>
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
                    <div className="flex w-full flex-col">
                      <select
                        name="categories"
                        id="categories"
                        value={formData.categories}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            categories: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-gray-500"
                      >
                        <option value="">Categoria</option>
                        {categories?.map((category: Category) => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div> */}
          </div>
          <div className="w-full flex items-center gap-2">
            {step > 1 && (
              <Button
                onClick={() => {
                  setStep(step - 1);
                }}
                type="button"
                cor="primary"
                className="w-full"
              >
                <span>Volta</span>
              </Button>
            )}
            <Button
              onClick={() => {
                stepsFunction(step);
              }}
              type={"button"}
              cor="secondary"
              className="w-full"
            >
              <span>Next</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
