
import Link from "next/link";

export default function CommentForm({ postId, data, status, comment,setComment, handleCommentSubmit, editMode}) {
  
  const status = "authenticated"


  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/log-in">
          <button className="bg-slate-800 px-10 py-5 text-white mt-10 flex justify-between items-center gap-5 shadow-md hover:bg-slate-700">
            Login to comment
          </button>
        </Link>
      ) : (
        <div className="flex gap-3 w-full mt-10">
          <div className="border rounded-md border-slate-300 w-[80%]">
            <textarea
              type="text"
              className="bg-transparent outline-none h-[5rem] w-full ps-5 pt-5"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handleCommentSubmit}
              className="bg-slate-950 px-2 py-2 text-white shadow hover:bg-slate-800 hover:shadow-md"
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </>
  );
}
