import { EntryProps } from "@/@types/EntryProps"
import { ExpenseTotal } from "@/components/ExpenseTotal";
import { IncomeTotal } from "@/components/IncomeTotal";
import { Total } from "@/components/Total";
import prisma from '../lib/prisma'

export const revalidate = 10;

export default async function Home() {
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
    <main className="p-4 backdrop-blur-sm max-w-md flex justify-center items-center rounded-md bg-white/60 h-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {/* <pre>
            {JSON.stringify(entriesIncome, null, 2)}
          </pre> */}
          <div className="">
            <ExpenseTotal entriesExpense={entriesExpense}/>
          </div>
          <div className="">
              <IncomeTotal entriesIncome={entriesIncome} />
          </div>
        </div>
        <div className="">
          <Total entriesIncome={entriesIncome} entriesExpense={entriesExpense}/>
        </div>
      </div>
    </main>
  );
}
