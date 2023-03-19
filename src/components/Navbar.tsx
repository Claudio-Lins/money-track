/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useThemeStore } from "@/store/themeStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { List, Moon, Sun, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Login } from "./Login";

export function Navbar({ session }: any) {
  const { theme, setTheme } = useThemeStore();
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");
  const [lgNeg, setLgNeg] = useState(false);
  const [productsPath, setProductsPath] = useState(false);

  // const router = useRouter()
  // const { slug } = router.query

  // useEffect(() => {
  //   if (router.asPath === `/products/${[slug]}` || router.asPath === '/order' || router.asPath === '/sobre') {
  //     setTextColor('#000000')
  //     setProductsPath(true)
  //   } else {
  //     setTextColor('white')
  //     setProductsPath(false)
  //   }
  // }, [router.asPath, slug])

  // useEffect(() => {
  //   const changeColor = () => {
  //     if (window.scrollY >= 90 || router.asPath === `/products/${[slug]}` ) {
  //       setColor('#ffffff')
  //       setTextColor('#000000')
  //       setLgNeg(true)
  //     } else {
  //       setColor('transparent')
  //       setTextColor('white')
  //       setLgNeg(false)
  //     }
  //   }
  //   window.addEventListener('scroll', changeColor)
  // }, [router.asPath, slug])

  function toggleMenu() {
    setNav(!nav);
  }

  return (
    <header
      // style={{
      //   backgroundColor: color,
      // }}
      className={`
      fixed left-0 -top-1 z-10 w-full shadow-sm duration-300 ease-in  bg-white/10 backdrop-blur-sm
      ${ theme === "light" ? 'text-zinc-900' : 'text-white' }`}
    >
      <div className="m-auto flex max-w-[1240px] items-center justify-between p-4">
        <Link href="/">
          <p className="text-2xl font-bold">MoneyTracker</p>
        </Link>
        <ul className="hidden sm:flex">
          <li className="p-4">
            <Link href="/summary">Summary</Link>
          </li>
        </ul>
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
        <div className="">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {
              theme === 'light' ? (<Moon size={30} color='#000'/>) : (<Sun size={30} color='yellow'/>)
            }
          </button>
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
          <ul>
            <li
              onClick={toggleMenu}
              className="p-4 text-4xl hover:text-gray-400"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={toggleMenu}
              className="p-4 text-4xl hover:text-gray-400"
            >
              <a href="/summary">Summary</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
