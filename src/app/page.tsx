import { EntryProps } from "@/@types/EntryProps";
import { ExpenseTotal } from "@/components/ExpenseTotal";
import { IncomeTotal } from "@/components/IncomeTotal";
import { Total } from "@/components/Total";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import prisma from "../lib/prisma";
import Image from "next/image";

import { LoginButton, LogoutButton } from "./auth";

export const revalidate = 10;

export default async function Home() {
  const session = await getServerSession(authOptions);
  const entriesIncome = await prisma.entry.findMany({
    where: {
      type: {
        equals: "INCOME",
      },
    },
    include: {
      categories: true,
      User: true,
    },
  });

  const entriesExpense = await prisma.entry.findMany({
    where: {
      type: {
        equals: "EXPENSE",
      },
    },
    include: {
      categories: true,
      User: true,
    },
  });

  return (
    <main className="p-4 backdrop-blur-sm md:max-w-lg w-full max-w-md flex items-center rounded-md bg-white/60 h-auto flex-col">
      <header className="w-full flex flex-col justify-center">
        {!session ? (
          <LoginButton />
        ) : (
          <div className="cursor-pointer flex justify-center items-center gap-2 border-b pb-2">
            <div className="flex flex-col justify-center items-center">
              <Image
                className="rounded-full"
                // @ts-ignore
                src={session && session.user?.image}
                alt=""
                width={45}
                height={45}
              />
              <LogoutButton />
            </div>
            <strong>{session?.user?.name}</strong>
          </div>
        )}
      </header>
      {session && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="">
              <ExpenseTotal entriesExpense={entriesExpense} />
            </div>
            <div className="">
              <IncomeTotal entriesIncome={entriesIncome} />
            </div>
          </div>
          <div className="">
            <Total
              entriesIncome={entriesIncome}
              entriesExpense={entriesExpense}
            />
          </div>
        </div>
      )}
      <pre>
        {JSON.stringify(entriesIncome, null, 2)}
      </pre>
    </main>
  );
}
