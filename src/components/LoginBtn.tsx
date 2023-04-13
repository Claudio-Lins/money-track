"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { GoogleBtn } from "./GoogleBtn";
export default async function Component({ children }: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="p-4 flex items-center gap-2">
        <div className="flex flex-col justify-center items-center">
                <Image
                  className="rounded-full"
                  // @ts-ignore
                  src={session && session.user?.image}
                  alt=""
                  width={35}
                  height={35}
                />
                {/* <strong className="text-xs mt-2">{session?.user?.name}</strong> */}
              </div>
        {children}
      </div>
    );
  }
  return (
    <div className="">
      <GoogleBtn/>
    </div>
  );
}