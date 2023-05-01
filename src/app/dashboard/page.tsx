import { CategoryProps } from "@/@types/CategoryProps";
import { EntryProps } from "@/@types/EntryProps";
import { getEntries, getCategories } from "@/lib/fetchs";

import Categorias from "./components/categories/Categorias";
import { Charts } from "./components/Charts";

export default async function Dashborad() {
  const entries = await getEntries();
  const categories = await getCategories();

  const categoria = categories?.map((category: CategoryProps) => category.name);

  return (
    <div className="w-full backdrop-blur-sm max-w-6xl flex justify-center overflow-auto rounded-md bg-white/50 p-4">
      
        <div className="flex w-full flex-wrap gap-10 justify-center mt-6">
          <Categorias
            entries={entries}
            categories={categories}
            categoria={"Combustível"}
          />
          <Categorias
            entries={entries}
            categories={categories}
            categoria={"Alimentação"}
          />
          <Categorias
            entries={entries}
            categories={categories}
            categoria={"Saúde"}
          />
        </div>
        {/* <Charts entries={entries} categories={categories}/> */}
      </div>
  );
}
