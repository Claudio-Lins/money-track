
import { ExpenseTotal } from "@/components/ExpenseTotal";
import { IncomeTotal } from "@/components/IncomeTotal";
import { Total } from "@/components/Total";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import prisma from "../lib/prisma";
import Image from "next/image";

import { LoginButton, LogoutButton } from "./auth";
import ModalExpense from "@/components/ModalExpense";

export const revalidate = 10;

export default async function Home() {
  const session = await getServerSession(authOptions);
  // const entriesIncome = await prisma.entry.findMany({
  //   where: {
  //     type: {
  //       equals: "INCOME",
  //     },
  //   },
  //   include: {
  //     categories: true,
  //     User: true,
  //   },
  // });

  // const entriesExpense = await prisma.entry.findMany({
  //   where: {
  //     type: {
  //       equals: "EXPENSE",
  //     },
  //   },
  //   include: {
  //     categories: true,
  //     User: true,
  //   },
  // });

  return (
    <>
      <main className="w-full backdrop-blur-sm max-w-6xl flex flex-col justify-start h-[calc(100vh_-_100px)] md:h-[calc(100vh_-_150px)] overflow-auto rounded-md bg-white/50 p-4">
        <header className="w-full flex flex-col justify-center px-4">
          {!session ? (
            <LoginButton />
          ) : (
            <div className="cursor-pointer flex justify-between items-center gap-2 border-b pb-2">
              <div className="flex flex-col justify-center items-center">
                <Image
                  className="rounded-full"
                  // @ts-ignore
                  src={session && session.user?.image}
                  alt=""
                  width={45}
                  height={45}
                />
                <strong>{session?.user?.name}</strong>
              </div>
              <LogoutButton />
            </div>
          )}
        </header>
        {session && (
          <div className="w-full p-4 flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2">
              <ExpenseTotal session={session} />
              <IncomeTotal session={session} />
              <Total session={session} />
            </div>
            <div className="flex w-full justify-center items-center gap-2 mt-8">
            <ModalExpense/>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
