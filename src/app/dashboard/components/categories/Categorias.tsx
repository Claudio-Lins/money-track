"use client";

import { CategoryProps } from "@/@types/CategoryProps";
import { EntryProps } from "@/@types/EntryProps";
import { priceFormatter } from "@/utils/formatter";
import React, { useEffect, useState } from "react";

interface CombustivelProps {
  entries: EntryProps[];
  categories: CategoryProps[]
  categoria: string
}

export default function Categorias({ entries, categoria }: CombustivelProps) {
  const [soma, setSoma] = useState(0);
  const [color, setColor] = useState('')

  useEffect(() => {
    const soma = entries
      // ?.filter((entry: EntryProps) => entry.type === "EXPENSE")
      .filter((entry: EntryProps) =>
        entry.categories?.some(
          (category: CategoryProps) => category.name === categoria
        )
      )
      .reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0);
      if(entries
        ?.map((entry: EntryProps) => entry.type === "INCOME")) {
          setColor('bg-blue-500')
        } else {
          setColor('bg-green-500')
        }
      setSoma(soma);
  }, [categoria, entries]);
  return (
    <div className={`${color} w-32 flex flex-col justify-between items-center overflow-hidden rounded-md shadow-md`}>
      <strong className="bg-white w-full py-1 text-2xl text-center">{priceFormatter.format(soma)}</strong>
      <strong className=" w-full py-1 text-zinc-50 text-center">{categoria}</strong>
      <div className="flex items-center gap-2">
        {/* {categories
        ?.map((category: CategoryProps) => (
              <button
                key={category.id}
                onClick={() => setCategoria(category.name)}
                className={`${
                  categoria === category.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900 dark:bg-zinc-700 dark:text-zinc-100"
                } px-2 py-1 rounded-md text-xs font-bold`}
              >
                {category.name}
              </button>
            ))} */}
      </div>
    </div>
  );
}
