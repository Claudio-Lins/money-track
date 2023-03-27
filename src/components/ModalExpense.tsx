"use client";

import { ArrowCircleDown } from "phosphor-react";
import { SetStateAction, useState } from "react";
import { Button } from "./assets/Button";
import Modal from "./Modal";

interface FormData {
  amount: number | string;
  description: string
  location: string
  bankAccount: string
  recurring: string
  paymentMethod: string
}
export default function ModalExpense() {
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
// function create Entry
  async function handleSubmmit() {
    const data = {
      amount: formData.amount,
      description: formData.description,
      location: formData.location,
      bankAccount: formData.bankAccount,
      recurring: formData.recurring,
      paymentMethod: formData.paymentMethod,
    };
    console.log(data);
    const response = await fetch("http://localhost:3000/api/entries/create-entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const dataResponse = await response.json()
    console.log(dataResponse)
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
                <h2 className="text-2xl font-bold">Despesa</h2>

                <form onSubmit={handleSubmmit} className="mt-4 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex w-full flex-col">
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
                        className="w-full rounded-md border border-gray-300 p-2"
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
                            description: (e.target.value),
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
                            location: (e.target.value),
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
                            bankAccount: (e.target.value),
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
                            recurring: (e.target.value),
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
                            paymentMethod: (e.target.value),
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
              onClick={() => handleSubmmit()}
              type="submit"
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
