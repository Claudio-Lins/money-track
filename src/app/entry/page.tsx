
import { NewEntry } from "@/components/NewEntry";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


export default async function Entry() {
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
    <div className="w-full flex justify-center">
      <NewEntry
        entries={entries}
        session={session}
        categories={categories}
      />
    </div>
  )
}
