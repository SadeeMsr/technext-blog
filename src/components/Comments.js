"use client";

import { useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CommentsContext } from "@/ContextProviders/CommentsProvider";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

export default function Comments({ postId }) {
  const { comments } = useContext(CommentsContext);
  const { data, status } = useSession();

  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState();

  useEffect(() => {
    setCommentData(comments);
  }, [comments]);

  async function handleCommentSubmit() {
    console.log(data);
    try {
      const response = await fetch("/api/comments/new", {
        method: "POST",
        body: JSON.stringify({
          postId: Number(postId),
          body: comment,
          email: data?.user.email,
        }),
      });

      if (response.ok) {
        const commentNew = await response.json();
        setCommentData([
          ...comments,
          {
            id: commentNew.id,
            postId: commentNew.postId,
            body: commentNew.body,
            email: commentNew.email,
            name: data?.user.name,
            image: data?.user.image,
          },
        ]);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(body, id) {
    setComment(body);
    console.log(body, id);

    if (!id) return alert("Missing comment id!");

    try {
      const response = await fetch(`/api/comments`, {
        method: "PATCH",
        body: JSON.stringify({
          comment,
          id,
        }),
      });

      if (response.ok) {
        const commentNew = await response.json();
        setCommentData([
          ...comments,
          {
            id: commentNew.id,
            postId: commentNew.postId,
            body: commentNew.body,
            email: commentNew.email,
            name: data?.user.name,
            image: data?.user.image,
          },
        ]);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    console.log(id)
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/comments`, {
          method: "DELETE",
          body: JSON.stringify({
            id
          }),
        });
        if (response.ok) {
          const afterDeleted = commentData.filter((item)=> item.id !== id)
          setCommentData(afterDeleted)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="ps-10 pt-9 w-[30%]">
      <h1 className="header_text text-2xl">Comments</h1>
      <CommentForm
        postId={postId}
        comment={comment}
        setComment={setComment}
        data={data}
        status={status}
        handleCommentSubmit={handleCommentSubmit}
      />
      <div className="mt-10">
        {commentData?.map((item) => (
          <CommentCard
            key={item.id}
            commentData={item}
            authStatus={status}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
