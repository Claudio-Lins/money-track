import { getEntries, getCategories } from "@/lib/fetchs";
import Combustivel from "./components/categories/Combustivel";

export default async function Dashborad() {
  const entries = await getEntries();
  const categories = await getCategories();

  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center overflow-auto rounded-md bg-white/50 p-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex w-full gap-16 justify-between">
          <Combustivel entries={entries} categories={categories} />
        </div>
      </div>
    </div>
  );
}
