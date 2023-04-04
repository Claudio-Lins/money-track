"use client";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { useThemeStore } from "@/store/themeStore";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export const revalidate = 60;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useThemeStore();
  return (
    <html lang="pt" className={inter.className}>
      <body
        className={`
        w-full bg-cover bg-no-repeat bg-center bg-fixed relative flex justify-center items-start mt-20 md:mt-32
        ${
          theme === "light"
            ? 'bg-[url("/theme/light.jpeg")]'
            : 'bg-[url("/auth/imgAuth.jpeg")]'
        }
        `}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
