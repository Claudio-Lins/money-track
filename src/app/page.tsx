import { EntryProps } from "@/@types/EntryProps"
import prisma from '../lib/prisma'

export const revalidate = 10;

export default async function Home() {
  const entriesIncome = await prisma.entry.findMany({
    include: {
      categories: true,
      },
      where: {
        income: false
    }
  })
  return (
    <main className="p-4 backdrop-blur-sm max-w-md flex justify-center items-center rounded-md bg-white/60 h-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <pre>
            {JSON.stringify(entriesIncome, null, 2)}
          </pre>
          <div className="">
            {/* <ExpenseTotal entries={entries}/> */}
          </div>
          <div className="">
              {/* <IncomeTotal entries={entries} /> */}
          </div>
        </div>
        <div className="">
          {/* <Total  entries={entries}/> */}
        </div>
      </div>
    </main>
  );
}
