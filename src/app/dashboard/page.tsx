
import BarChart from "@/components/dashboard/BarChart";
// import React, { useState } from "react";
import prisma from "@/lib/prisma";

async function getEntries() {
  const entries = await prisma?.entry.findMany()
  return entries;
    }


export default async function Dashborad() {
 const entries = await getEntries();

 
  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center h-[calc(100vh_-_100px)] md:h-[calc(100vh_-_150px)] overflow-auto rounded-md bg-white/50 p-4">
      <div className="w-3/4 p-4">
      <BarChart entries={entries} />
      </div>
    </div>
  )
}
