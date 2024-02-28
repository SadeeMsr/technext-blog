"use client";
import Image from "next/image";
import Link from "next/link";


export default function NavBar() {

  const status = "authenticated"
 
  console.log(status)
  return (
    <div className="py-5 border-b border-slate-800">
      <div className="px-20 flex justify-between items-center">
        <Link href="/">
          <div className="w-[50%]">
            <Image
              src={`/assets/technext.png`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt="Random image"
              priority
            />
          </div>
        </Link>
        <div className="flex items-center gap-5 text-light">
          <Link href="/" className="hover:underline">
            Home
          </Link>
         {status === "authenticated" && <Link href="/write-blog" className="hover:underline">
            Write blog
          </Link>}
         {/* {status === "authenticated" && <p className="font-bold">{data?.user?.name}</p>} */}
          {(status === "unauthenticated" ||  status === "loading")? (
            <Link href="/log-in" className="p-2 px-8 border rounded shadow border-slate-800 hover:bg-slate-800 hover:text-white">
              Log in
            </Link>
          ) : (
            <button
              className="p-2 px-8 border rounded shadow border-slate-800
              hover:bg-slate-800 hover:text-white"> Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
