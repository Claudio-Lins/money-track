import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-zinc-900/90 fixed inset-0">
      <Image src="/LoadingBar.svg" width={100} height={100} alt={""} />
    </div>
  );
}
