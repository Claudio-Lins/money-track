

export async function getEntries() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/entries/getAllEntries`, {
    cache: 'no-cache'
  });
  const entries = await res.json();
  return entries;
}

export async function getUsers() {
  const resUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getUsers`);
  const users = await resUser.json();
  return users;
}

export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/getAllCategories`);
  const categories = await res.json();
  return categories;
}