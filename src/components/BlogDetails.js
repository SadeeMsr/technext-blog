"use client";

import { useState, useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { MdArrowBack } from "react-icons/md";
import Editor from "./Editor";
import Blog from "./Blog";

export default function BlogDetails({ postId }) {
  const [isEditorOpened, setEditorOpened] = useState(false);
  const [blogDetails, setBlogDetails] = useState({});

  const fetchBlog = async () => {
    const response = await fetch(`/api/blog/${postId}`);
    const data = await response.json();
    setBlogDetails(data);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="w-[70%] min-h-screen border-r border-slate-800 pe-10 py-10">
      {isEditorOpened ? (
        <div className="flex justify-start">
          <div
            onClick={() => setEditorOpened(false)}
            className="flex items-center text-slate-400 gap-1 font-bold hover:underline hover:text-slate-600 cursor-pointer"
          >
            <MdArrowBack /> Go back
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <div
            onClick={() => setEditorOpened(true)}
            className="flex items-center text-slate-400 gap-1 font-bold hover:underline hover:text-slate-600 cursor-pointer"
          >
            <RiEditBoxLine /> Edit blog
          </div>
        </div>
      )}

      <div>
        {isEditorOpened ? (
          <Editor
            type="Edit"
            blogDetails={blogDetails}
            setBlogDetails={setBlogDetails}
            postId={postId}
            setEditorOpened={setEditorOpened}
          />
        ) : (
          <Blog blogDetails={blogDetails} />
        )}
      </div>
    </div>
  );
}
