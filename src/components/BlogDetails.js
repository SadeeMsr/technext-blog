"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { deletePost, updatePost } from "@/graphql/mutations";
import { RiEditBoxLine } from "react-icons/ri";
import { MdArrowBack } from "react-icons/md";
import Editor from "./Editor";
import Blog from "./Blog";
import { getCurrentUser } from "aws-amplify/auth";


const client = generateClient();

export default function BlogDetails({ blog }) {

 
  const [blogData, setBlogData] = useState({})
  const [isEditorOpened, setEditorOpened] = useState(false);
  const [isPostOwner, setIsPostOwner] = useState(false);

  useEffect( () => {
    setBlogData(blog)
    currentAuthenticatedUser()
  }, [])
  



  async function currentAuthenticatedUser() {
    try {
      const { username } = await getCurrentUser();
      console.log(username, blog.userName)
      if(username ===  blog.userName){
        setIsPostOwner(true)
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log(blogData)

  
  async function handleEdit(params) {
    params.id = blog.id
   try {
     const result = await client.graphql({
       query: updatePost,
       variables: { input: params },
       authMode: 'userPool'
     });
     setBlogData(result.data.updatePost)
     setEditorOpened(false)
   } catch (error) {
    
     console.log(error)
   }
  }


async function handleDelete() {
  try {
    const deletedTodo = await client.graphql({
      query: deletePost,
      variables: { input: {id: `${blogData.id}`} },
      authMode: 'userPool'
    });
    console.log(deletedTodo,"hellooo")
  } catch (error) {
    console.log(error)
  }
}



  return (
    <div className="w-[70%] min-h-screen border-r border-slate-800 pe-10 py-10">
      { isEditorOpened ? (
        <div className="flex justify-start">
          <div
            onClick={() => setEditorOpened(false)}
            className="flex items-center text-slate-400 gap-1 font-bold hover:underline hover:text-slate-600 cursor-pointer"
          >
            <MdArrowBack /> Go back
          </div>
        </div>
      ) : (
        <div className={`flex gap-5 justify-end ${!isPostOwner && "hidden"}`}>
          <div onClick={handleDelete} className="flex items-center text-red-400 gap-1 font-bold hover:underline hover:text-red-600 cursor-pointer">
              Delete
          </div>
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
            blogDetails={blogData}
            handleSubmit={handleEdit}
            setEditorOpened={setEditorOpened}
          />
        ) : (
          <Blog blogDetails={blogData} />
        )}
      </div>
    </div>
  );
}
