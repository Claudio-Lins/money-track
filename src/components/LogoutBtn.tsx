'use client'

import { signOut } from "next-auth/react";
import { SignOut } from "phosphor-react";
import React from "react";

export default function LogoutBtn() {
  return (
    <button
      className="flex items-center gap-2 bg-zinc-600 py-3 px-4 text-white rounded-md w-full max-w-md mt-10 hover:bg-zinc-700 transition"
      onClick={() => signOut()}
    >
      <span>Sair</span>
      <SignOut/>
    </button>
  );
}
