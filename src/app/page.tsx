import { ExpenseTotal } from "@/components/ExpenseTotal";
import { GoogleBtn } from "@/components/GoogleBtn";
import { IncomeTotal } from "@/components/IncomeTotal";
import { Total } from "@/components/Total";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // console.log("{session}");

  // const res = await fetch(`${process.env.BASE_URL}/api/entries/getAllEntries`);
  // const entries = await res.json();

  // const resCategory = await fetch(
  //   `${process.env.BASE_URL}/api/categories/getAllCategories`);
  // const categories = await resCategory.json();

  return (
    <>
      {session ? (
        <main className="w-full backdrop-blur-sm max-w-6xl flex flex-col py-10 items-center mt-10 overflow-auto rounded-md bg-white/50">
            <div className="w-full flex flex-col md:flex-row justify-evenly items-center gap-4">
              <ExpenseTotal session={session} />
              <IncomeTotal session={session} />
              <Total session={session} />
            </div>
        </main>
      ) : (
        <div className="w-full max-w-sm rounded-lg bg-white/40 backdrop-blur-sm p-8 flex flex-col justify-center mt-8 items-center gap-4">
          <h1 className="text-2xl font-bold">Welcome to Money Tracker</h1>
          <p className="text-sm text-center">
            Please login to start tracking your expenses
          </p>
          <div className=" flex flex-col justify-center items-center gap-2">
            <GoogleBtn />
          </div>
        </div>
      )}
    </>
  );
}
