"use client";

import { CategoryProps } from "@/@types/CategoryProps";
import { EntryProps } from "@/@types/EntryProps";
import { priceFormatter } from "@/utils/formatter";
import React, { useEffect, useState } from "react";

interface CombustivelProps {
  entries: EntryProps[];
  categories: CategoryProps[]
}

export default function Combustivel({ entries, categories }: CombustivelProps) {
  const [combustivel, setCombustivel] = useState(0);
  const [categoria, setCategoria] = useState("Alimentação");

  useEffect(() => {
    const combustivel = entries
      ?.filter((entry: EntryProps) => entry.type === "EXPENSE")
      .filter((entry: EntryProps) =>
        entry.categories?.some(
          (category: CategoryProps) => category.name === categoria
        )
      )
      .reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0);
    setCombustivel(combustivel);
  }, [categoria, entries]);
  return (
    <div>
      <p>{priceFormatter.format(combustivel)}</p>
      <div className="flex items-center gap-2">
        {categories
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
            ))}
      </div>
    </div>
  );
}
