'use client'

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";



export async function Login() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session ? (
        <button onClick={() => signOut()}>
          Logado
        {/* <Image
          src={session?.user?.image}
          alt="Picture of the author"
          width={50}
          height={50}
        /> */}
        </button>
      ) : (
        <button onClick={() => signIn('google')}>
          Não Logado
        </button>
      )}
    </>
  )
}
