"use client";
import { Input } from "@/components/Input";
import { GoogleLogo } from "phosphor-react";
import React, { ChangeEvent, useCallback, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { GoogleBtn } from "@/components/GoogleBtn";

export default function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  return (
    <div className='w-full h-screen bg-[url("/auth/imgAuth.jpeg")] bg-cover bg-no-repeat bg-center bg-fixed relative flex justify-center items-center'>
      <div className="flex justify-center w-full md:max-w-md px-4">
        <div className="p-8 backdrop-blur-sm bg-white/20 rounded-lg w-full">
          <h2 className="text-4xl mb-8 font-semibold text-white w-full">
            {variant === "login" ? "Entrar" : "Criar conta"}
          </h2>
          <div className="flex flex-col gap-4">
            {variant === "register" && (
              <Input
                label="Username"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                id="name"
                type="text"
                value={name}
              />
            )}
            <Input
              label="Email"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              id="email"
              type="email"
              value={email}
            />
            <Input
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <button className="bg-zinc-600 py-3 text-white rounded-md w-full mt-10 hover:bg-zinc-700 transition">
            {variant === "login" ? "Entrar" : "Criar conta"}
          </button>
          <p className="text-neutral-900 text-sm mt-2">
            {variant === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
            <span
              onClick={toggleVariant}
              className="text-zinc-900 cursor-pointer hover:underline ml-1"
            >
              {variant === "login" ? "Criar conta" : "Entrar"}
            </span>
          </p>
          <GoogleBtn/>
        </div>
      </div>
    </div>
  );
}
