import { Summary } from "@/components/Summary";
import React from "react";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const revalidate = 10;

async function getEntries() {
  const entries = await prisma?.entry.findMany({
    include: {
      categories: true,
      User: true,
    }
  })
  return entries;
    }
    
  export default async function Sumary() {
    const session = await getServerSession(authOptions);
      const entries = await getEntries();

      const entriesIncome = await prisma.entry.findMany({
        where: {
          type: {
            equals: "INCOME"
          }
      },
        include: {
          categories: true,
          User: true
          }
      })
    
      const entriesExpense = await prisma.entry.findMany({
        where: {
          type: {
            equals: "EXPENSE"
          }
      },
        include: {
          categories: true,
          User: true
          }
      })


  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center h-[calc(100vh_-_100px)] md:h-[calc(100vh_-_150px)] overflow-auto rounded-md bg-white/50 p-4">
      <Summary 
      // @ts-ignore
        entries={entries} 
        session={session}
        entriesIncome={entriesIncome} 
        entriesExpense={entriesExpense} 
      />
        {/* <pre>
          {JSON.stringify(entries, null, 2)}
        </pre> */}
    </div>
  );
}
