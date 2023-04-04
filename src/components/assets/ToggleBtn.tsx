"use client"
import React, { useState } from "react";

interface ToggleBtnProps {
  labelOne: string;
  labelTwo: string;
  labelPropOne: boolean
}

export function ToggleBtn({ labelOne, labelTwo, labelPropOne }: ToggleBtnProps) {
  const [tagOne, setTagOne] = useState(false);
  const [tagTwo, setTagTwo] = useState(true);

  if(labelPropOne === true) {
    alert('labelPropOne')
  }

  function toggleLabel() {
    setTagOne(!tagOne);
    setTagTwo(!tagTwo);
    if(tagOne) {
      console.log("tagOne is true")
    }
    if(tagTwo) {
      console.log("tagTwo is true")
    }
  }
  return (
        <div className="flex items-center border rounded-full overflow-hidden w-full max-w-sm ">
          <button
            disabled={!tagOne}
            onClick={toggleLabel}
            className={`
            w-full px-8 py-2 transition-all duration-1000 bg-white text-sm
            ${!tagOne ? "font-bold bg-zinc-900 text-white cursor-none" : "bg-white"}
            `}
          >
            {labelOne}
          </button>
          <button
            disabled={!tagTwo}
            onClick={toggleLabel}
            className={`
            w-full px-8 py-2 transition-all duration-1000 text-sm
            ${!tagTwo ? "font-bold bg-zinc-900 text-white cursor-none" : "bg-white"}
            `}
          >
            {labelTwo}
          </button>
        </div>
  );
}
