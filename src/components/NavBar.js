"use client";

import { useEffect, useState } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import Image from "next/image";
import Link from "next/link";


export default function NavBar() {

  const [username, setUsername] = useState("")

  useEffect(() => {
    currentAuthenticatedUser()
  }, [])


  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      setUsername(username)
    } catch (err) {
      console.log(err);
    }
  }
 
  async function handleSignOut() {
    try {
      await signOut();
      setUsername("")
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  


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
         {username && <Link href="/write-blog" className="hover:underline">
            Write blog
          </Link>}
         {username && <p className="font-bold">{username}</p>}
          { !username? (
            <Link href="/log-in" className="p-2 px-8 border rounded shadow border-slate-800 hover:bg-slate-800 hover:text-white">
              Log in
            </Link>
          ) : (
            <button
              onClick={handleSignOut}
              className="p-2 px-8 border rounded shadow border-slate-800
              hover:bg-slate-800 hover:text-white"> Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
