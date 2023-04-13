import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-zinc-900/90 fixed inset-0">
      <h2 className="text-2xl font-bold text-zinc-50 text-center w-full">
        Dashboard
      </h2>
      <Image src="/LoadingBar.svg" width={100} height={100} alt={""} />
    </div>
  );
}
