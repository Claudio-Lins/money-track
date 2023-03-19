import { ArrowLeft, ArrowRight } from "phosphor-react";
import React, { useState } from "react";

export function Month() {
  const [month, setMonth] = useState(new Date());
  return (
    <div className="flex items-center gap-4">
      <ArrowLeft
        size={26}
        className="hover:scale-125 transition-transform duration-800 cursor-pointer"
      />
      <h3 className="uppercase font-bold">
        {month.toLocaleString("default", { month: "short" })}
      </h3>
      <ArrowRight
        onClick={() => alert('próximo')}
        size={26}
        className="hover:scale-125 transition-transform duration-800 cursor-pointer"
      />
    </div>
  );
}
