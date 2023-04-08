"use client";

import { FormEvent } from "react";

export default function Dashborad() {
  
  function createEntry() {
    fetch(`/api/entries/create-entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 110,
        type: "INCOME",
        notes: "Teste",
        description: "Teste",
        bankAccount: 'WiZink',
        recurring: 'VARIABLE',
        paymentMethod: 'Cartão',
        userId: 'clfl25od500007wd8aygiy79j',
        categories: {
          connect: {
            id: 2
          }
        }
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    createEntry();
  }

  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center overflow-auto rounded-md bg-white/50 p-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
      </div>
    </div>
  );
}
