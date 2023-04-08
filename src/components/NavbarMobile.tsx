import React from "react";
import Link from "next/link";
import { CurrencyEur } from "phosphor-react";

export function NavbarMobile() {
  return (
    <div className="fixed bottom-0 p-2 w-full md:hidden">
      <div className="flex justify-center items-center">
        <Link
          href="/entry"
          className="flex justify-center items-center p-4 bg-blue-600 rounded-full"
        >
          <CurrencyEur size={30} color="#ffffff" weight="bold"/>
        </Link>
      </div>
    </div>
  );
}
