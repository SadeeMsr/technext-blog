"use client";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const router = useRouter();




  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [status, router]);
  
  // if (status === "loading") {
  //   return <div className="mt-20"><Loader /></div>;
  // }
  
  
  return (
    <div className="flex justify-center items-center h-[45rem]">
      <div>
        <h1 className="text-center header_text text-3xl font-bold">Sign In</h1>
        <button className="bg-slate-800 px-10 py-5 text-white mt-10 flex justify-between items-center gap-5 shadow-md hover:bg-slate-700">
          <FcGoogle size={25} /> Sign in with Google
        </button>
      </div>
    </div>
  );
}

















//Use for future

      // const createUser = async (e) => {
      //   try {
      //     const response = await fetch("/api/create-user", {
      //       method: "POST",
      //       body: JSON.stringify(data?.user),
      //     });
          
      //     console.log(response)
      //     if (response.ok) {
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
    
      // createUser();