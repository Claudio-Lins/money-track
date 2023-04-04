"use client";

interface LoginButtonProps {
  img?: string;
}

import { signIn, signOut } from "next-auth/react";
import { GoogleLogo, SignOut } from "phosphor-react";

export const LoginButton = () => {
  return (
    <button
      className="bg-[#4285f4] text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center"
      onClick={() => signIn("google")}
    >
      <GoogleLogo size={24} weight="regular" />
      Sign in
    </button>
  );
};

export const LogoutButton = () => {
  return <button className="text-sm flex items-center gap-2" onClick={() => signOut()}>
    Sair <SignOut size={24} weight='regular'/>
    </button>;
};
