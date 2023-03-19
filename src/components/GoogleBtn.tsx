"use client";

import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { GoogleLogo } from "phosphor-react";
import React from "react";

export function GoogleBtn({ session }: any) {
  return (
    <>
      {session ? (
        <button
          className="flex items-center gap-2 bg-zinc-600 py-3 px-4 text-white rounded-md w-full mt-10 hover:bg-zinc-700 transition"
          onClick={() => signOut()}
        >
          {session?.user?.name}
          <span>Sair</span>
        </button>
      ) : (
        <button
          className="flex items-center gap-2 bg-zinc-600 py-3 px-4 text-white rounded-md w-full mt-10 hover:bg-zinc-700 transition"
          onClick={() => signIn("google")}
        >
          <GoogleLogo size={24} />
          <span>Entrar com Google</span>
        </button>
      )}
    </>
  );
}
