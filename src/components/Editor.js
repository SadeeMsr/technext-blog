"use client";
import React, { useState, useEffect, Suspense } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import { app } from "@/utils/firebase";
import { LuImagePlus } from "react-icons/lu";
import Loader from "./Loader";
import Image from "next/image";

export default function Editor({
  type,
  blogDetails,
  postId,
  setEditorOpened,
  setBlogDetails,
}) {
  const status = "authenticated"
  const router = useRouter();

  const [body, setBody] = useState(blogDetails?.body || "");
  const [title, setTitle] = useState(blogDetails?.title || "");
  const [file, setFile] = useState(null);
  const [coverImg, setCoverImg] = useState(blogDetails?.coverImg || "");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const storage = getStorage(app);
  //   const upload = () => {
  //     const name = new Date().getTime() + file.name;
  //     const storageRef = ref(storage, name);

  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //         }
  //       },
  //       (error) => {},
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setCoverImg(downloadURL);
  //         });
  //       }
  //     );
  //   };

  //   file && upload();
  // }, [file]);

  // console.log(body, title, file, coverImg);

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

  const handleSubmit = async () => {
    if (type !== "Edit") {
      setLoading(true);
      const res = await fetch("/api/blog/new", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          coverImg,
          email: data?.user.email,
        }),
      });
      if (res.status === 200) {
        setLoading(false);
        alert("Congratulations you have successfully published the blog!!");
        const data = await res.json();
        router.push(`/blog-details/${data.id}`);
      }
    } else {
      if (!postId) return alert("Missing blog id!");

      try {
        const response = await fetch(`/api/blog/${postId}`, {
          method: "PATCH",
          body: JSON.stringify({
            title,
            body,
            coverImg,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setBlogDetails(result);
          setEditorOpened(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleDelete = async () => {
  //   const hasConfirmed = confirm(
  //     "Are you sure you want to delete this prompt?"
  //   );

  //   if (hasConfirmed) {
  //     try {
  //       const response = await fetch(`/api/blog/${postId}`, {
  //         method: "DELETE",
  //       });
  //       if (response.ok) {
  //         console.log(response)
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

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
              onClick={handleSubmit}
              className="bg-slate-950 px-10 py-4 text-white shadow hover:bg-slate-800 hover:shadow-md"
            >
              {loading ? "Submitting..." : type}
            </button>
          )}
        </div>
      </div>
      <div className="bg-slate-50 min-h-screen my-5 mb-10 p-10">
        {!coverImg && (
          <div>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label
              htmlFor="image"
              className="text-slate-400 text-xl flex gap-5 border border-slate-300 p-5 justify-center items-center w-full cursor-pointer"
            >
              <LuImagePlus />
              Upload cover image
            </label>
          </div>
        )}

        {coverImg && (
          <div className="flex h-[28rem] relative overflow-hidden rounded-md">
            <Image src={coverImg} alt="" fill className="object-cover" />
          </div>
        )}

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
            value={body}
            onChange={setBody}
            placeholder="Tell your story..."
          />
        </div>
      </div>
    </>
  );
}
