"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";
import { uploadData } from "aws-amplify/storage";
import { useRouter } from "next/navigation";
import { LuImagePlus } from "react-icons/lu";
import Loader from "./Loader";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Editor({ type, blogDetails, handleSubmit }) {
  const status = "authenticated";
  const router = useRouter();
  const fileInput = useRef(null);

  const [content, setContent] = useState(blogDetails?.content || "");
  const [title, setTitle] = useState(blogDetails?.title || "");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(blogDetails?.coverImage || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleImageUpdate();
  }, [file]);

  
  async function handleImageUpdate() {
    if (!file) return null;
    try {
      console.log(file);
      const timestamp = new Date().getTime();
      const fileNameWithoutSpaces = file.name.replace(/\s/g, "");

      const newFileName =
        fileNameWithoutSpaces.replace(/\..+$/, "") +
        "_" +
        timestamp +
        file.name.match(/\.[^.]+$/)[0];

      const result = await uploadData({
        key: newFileName,
        data: file,
        options: {
          accessLevel: 'guest',
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${Math.round(
                  (transferredBytes / totalBytes) * 100
                )} %`
              );
            }
          },
        },
      }).result;
      console.log("Succeeded: ", result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="mt-20">
        <Loader />
      </div>
    );
  }


  return (
    <>
      <div className="flex justify-between items-center mt-5">
        <h1 className="header_text font-bold text-2xl">{type} your blog</h1>

        <div>
          {/* {status === "authenticated" && type === "Edit" && (
            <button
              onClick={handleDelete}
              className="bg-slate-400 px-10 py-4 mr-6 text-black shadow hover:bg-slate-400 hover:shadow-md"
            >
              Delete
            </button>
          )} */}

          {status === "authenticated" && (
            <button
              disabled={loading}
              onClick={() => handleSubmit({ title, content, coverImage })}
              className="bg-slate-950 px-10 py-4 text-white shadow hover:bg-slate-800 hover:shadow-md"
            >
              {loading ? "Submitting..." : type}
            </button>
          )}
        </div>
      </div>
      <div className="bg-slate-50 min-h-screen my-5 mb-10 p-10">
        {
          <div>
            <input
              type="file"
              id="image"
              ref={fileInput}
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label
              htmlFor="image"
              className="text-slate-400 text-xl flex gap-5 border border-slate-300 p-5 justify-center items-center w-full cursor-pointer"
              // onClick={handleImageUpdate}
            >
              <LuImagePlus />
              Upload cover image
            </label>
          </div>
        }

        {/* {coverImg && (
          <div className="flex h-[28rem] relative overflow-hidden rounded-md">
            <Image src={coverImg} alt="" fill className="object-cover" />
          </div>
        )} */}

        <input
          type="text"
          className="bg-transparent outline-none w-full text-5xl font-bold my-10"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <ReactQuill
            theme="bubble"
            value={content}
            onChange={setContent}
            placeholder="Tell your story..."
          />
        </div>
      </div>
    </>
  );
}
