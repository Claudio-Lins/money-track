/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useThemeStore } from "@/store/themeStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CurrencyEur, List, Moon, Sun, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Navlink } from "./Navlink";
import { LogoutButton } from "@/app/auth";
import LoginBtn from "./LoginBtn";

export function Navbar() {
  
  const { theme, setTheme } = useThemeStore();
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  function toggleMenu() {
    setNav(!nav);
  }

  return (
    <div
      className={`
      fixed left-0 -top-1 z-10 w-full shadow-sm duration-300 ease-in  bg-white/10 backdrop-blur-sm
      ${theme === "light" ? "text-zinc-900" : "text-white"}`}
    >
      <div className="m-auto flex max-w-[1240px] items-center justify-between p-4">
        <Link href="/">
          <p className="text-2xl font-bold text-white">MoneyTracker</p>
        </Link>
        <div className="hidden sm:flex items-center gap-4">
          <Navlink href="/summary">Summary</Navlink>
          <Navlink href="/dashboard">Dashboard</Navlink>
          <Navlink href="/entry">
            <CurrencyEur size={24} weight='bold'/>
          </Navlink>
        </div>
        <div
          onClick={toggleMenu}
          className="z-10 block cursor-pointer sm:hidden"
        >
          {nav ? (
            <X size={24} color="white" />
          ) : (
            <List size={24} style={{ color: `${textColor}` }} />
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon size={30} color="#000" />
              ) : (
                <Sun size={30} color="yellow" />
              )}
            </button>
          </div>
          <LoginBtn>
            <LogoutButton />
          </LoginBtn>
        </div>
        <div
          className={`
        ${
          nav
            ? "absolute inset-0 flex h-screen w-full items-center justify-center bg-black text-center text-white duration-300 ease-in sm:hidden"
            : "absolute top-0 -left-[100%] flex h-screen w-full items-center justify-center bg-black text-center text-white duration-300 ease-in sm:hidden"
        }
        `}
        >
          <div className="flex flex-col justify-center gap-4">
            <Navlink onClick={toggleMenu} href="/">
              Home
            </Navlink>
            <Navlink onClick={toggleMenu} href="/summary">
              Summary
            </Navlink>
            <Navlink onClick={toggleMenu} href="/dashboard">
              Dashboard
            </Navlink>
            <Navlink onClick={toggleMenu} href="/entry">
            <CurrencyEur size={24} weight='bold'/>
          </Navlink>
          </div>
        </div>
      </div>
    </div>
  );
}
