

export async function getEntries() {
  const res = await fetch(`${process.env.BASE_URL}/api/entries/getAllEntries`, {
    cache: 'no-cache'
  });
  const entries = await res.json();
  return entries;
}

export async function getUsers() {
  const resUser = await fetch(`${process.env.BASE_URL}/api/user/getUsers`);
  const users = await resUser.json();
  return users;
}
