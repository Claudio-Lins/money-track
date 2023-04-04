'use client'

import { signIn } from "next-auth/react";
import { GoogleLogo } from "phosphor-react";
import React from "react";

export default function SignInBtn() {
  return (
    <button
      className="flex items-center gap-2 bg-zinc-900 py-3 px-4 text-white rounded-md hover:bg-zinc-700 transition"
      onClick={() => signIn('google')}
    >
      <GoogleLogo weight="bold" size={20}/>
    </button>
  );
}
