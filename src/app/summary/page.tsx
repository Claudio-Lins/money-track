import React from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Transactions } from "@/components/Transactions";

export default async function Sumary() {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.BASE_URL}/api/entries/getAllEntries`, {
    cache: 'no-cache'
  });
  const entries = await res.json();

  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center mt-8  overflow-auto rounded-md bg-white/50 py-4">
      <Transactions
      entries={entries}
      session={session}
      />
    </div>
  );
}
