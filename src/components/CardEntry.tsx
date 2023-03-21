import React from "react";
import { ArrowCircleDown, ArrowCircleUp, PencilLine, Trash } from "phosphor-react";

interface CardEntryProps {
  date: string;
  category: string;
  place: string;
  amount: number | string;
  arrow: string;
}

export function CardEntry({
  date,
  category,
  place,
  amount,
  arrow
}: CardEntryProps) {
  return (
    <div className={`
      w-full border py-2 px-4 rounded-md h-auto flex flex-col justify-between shadow-md
      overflow-hidden
    `}>
      <div className="">
        <div className="flex items-center justify-between border-b pb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{date}</span>
          {arrow === "EXPENSE" ? (
            <ArrowCircleDown weight="fill" size={24} color="#ff0000" />
          ) : (
            <ArrowCircleUp weight="fill" size={24} color="#00ff00" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1">
            <PencilLine size={20} />
          </button>
          <button className="p-1">
            <Trash size={20} />
          </button>
        </div>
        </div>
        <div className="flex flex-col text-xs gap-0 mt-2">
          <div className="flex flex-wrap gap-0">{category}</div>
        </div>
      </div>
      <div className="w-full border-t pt-1 flex justify-between items-center">
        <p className="text-sm font-bold">{place}</p>
        <p className="text-2xl font-bold">{amount}</p>
      </div>
    </div>
  );
}
