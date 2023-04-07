"use client";

interface LoginButtonProps {
  img?: string;
}

import { useSession, signIn, signOut } from "next-auth/react";
import { GoogleLogo, SignOut } from "phosphor-react";
import Image from "next/image";

// export const LoginButton = () => {
//   const { data: session } = useSession();
//   return (
//     <button
//       className="bg-[#4285f4] text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center"
//       onClick={() => signIn("google")}
//     >
//       <GoogleLogo size={24} weight="regular" />
//       Sign in
//     </button>
//   );
// };

export const LogoutButton = () => {
  const { data: session } = useSession();
  return (
    <button
      className="text-sm flex items-center gap-2"
      onClick={() => signOut()}
    >
      {session && (
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
          </div>
          Sair <SignOut size={24} weight="regular" />
        </div>
      )}
    </button>
  );
};
