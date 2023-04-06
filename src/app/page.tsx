import { ExpenseTotal } from "@/components/ExpenseTotal";
import { IncomeTotal } from "@/components/IncomeTotal";
import { Total } from "@/components/Total";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ModalExpense from "@/components/ModalExpense";

export const revalidate = 10;


export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("{session}");

  const res = await fetch(`${process.env.BASE_URL}/api/entries/getAllEntries`);
  const entries = await res.json();

  const resCategory = await fetch(
    `${process.env.BASE_URL}/api/categories/getAllCategories`, {
      cache: "no-cache"
    });
  const categories = await resCategory.json();

  return (
    <>
    {session && (
      <main className="w-full backdrop-blur-sm max-w-6xl flex flex-col justify-start h-[calc(100vh_-_100px)] md:h-[calc(100vh_-_150px)] overflow-auto rounded-md bg-white/50 p-4">
          <div className="w-full p-4 flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2">
              <ExpenseTotal session={session} />
              <IncomeTotal session={session} />
              <Total session={session} />
            </div>
            <div className="flex w-full justify-center items-center gap-2 mt-8">
            <ModalExpense entries={entries} session={session} categories={categories}/>
            </div>
          </div>
          </main>
        )}
      {/* <LoginBtn>
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
      </LoginBtn> */}
      {/* <main className="w-full backdrop-blur-sm max-w-6xl flex flex-col justify-start h-[calc(100vh_-_100px)] md:h-[calc(100vh_-_150px)] overflow-auto rounded-md bg-white/50 p-4">
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
            <ModalExpense entries={entries} session={session} categories={categories}/>
            </div>
          </div>
        )}
      </main> */}
    </>
  );
}
