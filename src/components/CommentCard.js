import { Suspense } from "react";
import Loader from "./Loader";
import Image from "next/image";

export default function CommentCard({commentData, authStatus, handleEdit, handleDelete}) {

  return (
    <div className="w-full flex min-h-[8rem] border-b border-slate-300 py-5">
      <div className="w-[30%]">
        <div className="overflow-hidden relative h-[4rem] w-[4rem] rounded-full bg-blue-200">
          <Suspense fallback={<Loader />}>
            <Image
              alt="Mountains"
              src={commentData?.image}
              sizes="100vw"
              fill
              style={{
                width: "100%",
                objectFit:"cover"
              }}
              priority
            />
          </Suspense>
        </div>
      </div>
      <div className="w-[80%] flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <p className="font-semibold">{commentData?.name}</p>
          <p className="text-sm text-slate-600">{commentData?.body}</p>
        </div>
        {authStatus === "authenticated" && <div className="flex gap-4 mt-10 text-xs font-semibold">
          <p onClick={() => handleDelete(commentData?.id)} className="text-red-300 cursor-pointer hover:underline">Delete</p>
          <p onClick={() => handleEdit(commentData?.body,commentData?.id)} className="text-slate-700 cursor-pointer hover:underline">Edit</p>
        </div>}
      </div>
    </div>
  );
}
