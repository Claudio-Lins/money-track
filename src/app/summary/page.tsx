import { Summary } from "@/components/Summary";
import React from "react";

async function getEntries() {
  const response = await fetch(`${process.env.BASE_URL}/api/entries`);
  return response.json();
}

export default async function Sumary() {
  
  const entries = await getEntries();

  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center h-screen rounded-md bg-white/50 p-4">
      <Summary entries={entries} category={[]} />
    </div>
  );
}
