
import { FormEvent } from "react";

export async function StartEntry({entries, session}: any) {

  function getUserIdByEmail() {
    const userIdSession = entries
      .filter((entry: any) => entry.User?.email === session?.user?.email)
      .map((entry: any) => entry.userId);
    return String(userIdSession)
      .split(",")
      .filter((value, index, array) => array.indexOf(value) === index)[0];
  }

  function createEntry() {
    fetch(`${process.env.BASE_URL}/api/entries/create-entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 110,
        type: "INCOME",
        typeAccount: "CORPORATIVO",
        userId: getUserIdByEmail(),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log({ data }))
      .catch((err) => console.log(err));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    createEntry();
  }

   const emailSession = session?.user?.email;
   function emailEntry() {
    const emailEntries = entries
    .filter((entry: any) => entry.User.email)
    .map((entry: any) => entry.User.email)
    return String(emailEntries)
      .split(",")
      .filter((value, index, array) => array.indexOf(value) === index)[0];
   }

   if (emailSession !== emailEntry()) {
     console.log('Diferent')
     createEntry()
    } else {
    console.log('Não criar Entry');
  }

  return (
    <div>
      <p>SessionUser: {emailSession}</p>
      <p>EntryUser: {emailEntry()}</p>
    </div>
  )
}
