import React from "react";
import Link from "next/link";
import { LogoutButtonMobile } from "@/app/auth";
import { CurrencyEur, Gauge, House, ListChecks } from "phosphor-react";

export function NavbarMobile() {
  return (
    <div className="fixed z-10 bottom-0 p-2 w-full bg-white/20 backdrop-blur md:hidden">
      <div className="flex justify-center items-center gap-4">
        <Link
          href="/"
          className="flex justify-center items-center p-2 bg-zinc-500 rounded-full"
        >
          <House size={24} color="#ffffff" weight="regular"/>
        </Link>
        <Link
          href="/summary"
          className="flex justify-center items-center p-2 bg-zinc-500 rounded-full"
        >
          <ListChecks size={24} color="#ffffff" weight="regular"/>
        </Link>
        <Link
          href="/entry"
          className="flex justify-center items-center p-4 bg-blue-600 rounded-full"
        >
          <CurrencyEur size={30} color="#ffffff" weight="bold"/>
        </Link>
        <Link
          href="/dashboard"
          className="flex justify-center items-center p-2 bg-zinc-500 rounded-full"
        >
          <Gauge size={24} color="#ffffff" weight="regular"/>
        </Link>
        {/* @ts-ignore */}
        <LogoutButtonMobile />
      </div>
    </div>
  );
}
