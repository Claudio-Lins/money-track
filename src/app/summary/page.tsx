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
  // const response = await fetch(`${process.env.BASE_URL}/api/entries`,{
    //   next: {
      //     revalidate: 1,
      //   }
      // });
      // return response.json();
    }
    
    export default async function Sumary() {
      const entries = await getEntries();

  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center h-[calc(100vh_-_100px)] md:h-[calc(100vh_-_150px)] overflow-auto rounded-md bg-white/50 p-4">
      <Summary entries={entries} />
    </div>
  );
}
