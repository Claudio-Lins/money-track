"use client";

import { useThemeStore } from "@/store/themeStore";
import { ArrowCircleDown } from "phosphor-react";
import { FormEvent, SetStateAction, useState } from "react";
import { Button } from "./assets/Button";
import Modal from "./Modal";

interface FormData {
  amount: number | string;
  description: string;
  location: string;
  bankAccount: string;
  recurring: string;
  paymentMethod: string;
}
export default function ModalExpense({ entries, session }: any) {
  const [typeData, setTypeData] = useState("INCOME");
  const [income, setIncome] = useState(false);
  const [expense, setExpense] = useState(true);
  const { theme, setTheme } = useThemeStore();
  const [modalStatus, setModalStatus] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    description: "",
    location: "",
    bankAccount: "",
    recurring: "",
    paymentMethod: "",
  });

let test = "clfl25od500007wd8aygiy79j,clfl25od500007wd8aygiy79j,clfl25od500007wd8aygiy79j,clfl25od500007wd8aygiy79j,clfl25od500007wd8aygiy79j,clfl25od500007wd8aygiy79j,clfl25od500007wd8aygiy79j,clfl25od500007wd8aygiy79j"

// console.log(test.split(',').filter((value, index, array) => array.indexOf(value) === index)[0]);

  function getUserIdByEmail() {
    const userIdSession = entries
    .filter((entry: any) => entry.User?.email === session?.user?.email)
    .map((entry: any) => (
      entry.userId
    ))
    return String(userIdSession).split(',').filter((value, index, array) => array.indexOf(value) === index)[0]
  }

  function createEntry() {
    fetch(`/api/entries/create-entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 30,
        type: "EXPENSE",
        typeAccount: "CORPORATIVO",
        notes: "Novo",
        description: "Teste",
        bankAccount: "WiZink",
        recurring: "VARIABLE",
        paymentMethod: "Cartão",
        userId: getUserIdByEmail(),
        categories: {
          connect: {
            id: 8,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    createEntry();
    setModalStatus(false)
  }

  function stepsFunction(step: number) {
    switch (step) {
      case 1:
        setStep(step + 1);
        break;
      case 2:
        // setStep(step + 1)
        setModalStatus(true);
        break;
      case 3:
      // handleSubmmit()
      default:
        break;
    }
  }

  function toggleTypeData() {
    setIncome(!income);
    setExpense(!expense);
    if (income) {
      setTheme("Expense");
    } else {
      setTheme("Income");
    }
  }

  return (
    <div className="w-full">
      <Button
        onClick={() => {
          setModalStatus(true);
        }}
        type="button"
        cor="tertiary"
        className="w-full"
      >
        <span>Adicionar Despesa</span>
        <ArrowCircleDown size={30} />
      </Button>
      <Modal status={modalStatus} setStatus={setModalStatus}>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <div className="w-full flex justify-center items-center gap-2">
            {step === 1 && (
              <div className="w-full">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-3xl font-bold">Despesa</h2>
                  <div className="">
                    <div className="flex items-center border rounded-full overflow-hidden ">
                      <button
                        onClick={toggleTypeData}
                        className={`
            w-full px-8 py-1 transition-all duration-500 bg-white text-sm
            ${expense ? "font-bold bg-zinc-900 text-white" : "bg-white"}
            `}
                      >
                        CORPORATIVO
                      </button>
                      <button
                        onClick={toggleTypeData}
                        className={`
            w-full px-8 py-1 transition-all duration-500 text-sm
            ${income ? "font-bold bg-zinc-900 text-white" : "bg-white"}
            `}
                      >
                        PESSOAL
                      </button>
                    </div>
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
                        <option value="1">Fixa</option>
                        <option value="2">Váriavel</option>
                        <option value="3">...</option>
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
                        <option value="1">Crédito</option>
                        <option value="2">Débito</option>
                        <option value="3">Especies</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                  >Enviar</button>
                </form>
              </div>
            )}
          </div>
          <div className="w-full flex items-center gap-2">
            <Button
              onClick={() => {
                setModalStatus(false);
              }}
              type="button"
              cor="primary"
              className="w-full"
            >
              <span>Cancel</span>
            </Button>
            <Button
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
