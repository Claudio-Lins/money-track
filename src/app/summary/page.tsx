import { Summary } from "@/components/Summary";
import React from "react";
import prisma from "@/lib/prisma";

export const revalidate = 10;

async function getEntries() {
  const entries = await prisma?.entry.findMany({
    include: {
      categories: true,
    }
  })
  return entries;
    }
    
  export default async function Sumary() {
      const entries = await getEntries();

      const entriesIncome = await prisma.entry.findMany({
        where: {
          type: {
            equals: "INCOME"
          }
      },
        include: {
          categories: true,
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
          }
      })



  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center h-[calc(100vh_-_100px)] md:h-[calc(100vh_-_150px)] overflow-auto rounded-md bg-white/50 p-4">
      <Summary entries={entries} entriesIncome={entriesIncome} entriesExpense={entriesExpense} />
    </div>
  );
}
