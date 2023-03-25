import React from "react";
import { ArrowCircleDown, ArrowCircleUp, PencilLine, Trash } from "phosphor-react";

interface CardEntryProps {
  date: string;
  category: string;
  place: string;
  amount: number | string;
  arrow: string;
  metodPayment: string
}

export function CardEntry({
  date,
  category,
  place,
  amount,
  arrow,
  metodPayment
}: CardEntryProps) {
  return (
    <div className={`
      w-full border py-2 px-4 rounded-md h-auto flex flex-col justify-between shadow-md
      overflow-hidden
    `}>
      <div className="">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{date}</span>
        </div>
        <div className="flex items-center gap-2">
        {arrow === "EXPENSE" ? (
            <ArrowCircleDown weight="fill" size={24} color="#ff0000" />
          ) : (
            <ArrowCircleUp weight="fill" size={24} color="#00ff00" />
          )}
          <button className="p-1">
            <PencilLine size={20} />
          </button>
          <button className="p-1">
            <Trash size={20} />
          </button>
        </div>
        </div>
        <div className="flex justify-center flex-col text-xs border-t border-b">
          <div className="flex flex-wrap gap-0">{category}</div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
        <p className="text-sm font-bold">Local: 
          <span className="font-normal text-xs"> {place}</span>
        </p>
        <p className="text-sm font-bold">Metodo de Pagamento: 
          <span className="font-normal text-xs"> {metodPayment}</span>
        </p>
        </div>
        <p className="text-2xl font-bold">{amount}</p>
      </div>
    </div>
  );
}
