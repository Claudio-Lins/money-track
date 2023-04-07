import { Summary } from "@/components/Summary";
import React from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Sumary() {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.BASE_URL}/api/entries/getAllEntries`, {
    cache: 'no-cache'
  });
  const entries = await res.json();


  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center h-[calc(100vh_-_100px)] md:h-[calc(100vh_-_150px)] overflow-auto rounded-md bg-white/50 p-4">
      <Summary
        entries={entries}
        session={session}
      />
      {/* <pre>
          {JSON.stringify(entries, null, 2)}
        </pre> */}
    </div>
  );
}
