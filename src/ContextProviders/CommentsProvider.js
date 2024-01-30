"use client";
import { createContext, useState, useEffect } from "react";

export const CommentsContext = createContext();

export default function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const response = await fetch("/api/comments");
    const comment = await response.json();

    setComments(comment);
  };

  useEffect(() => {
    getComments();
  }, []);

  
  return (
    <CommentsContext.Provider value={{ comments }}>
      {children}
    </CommentsContext.Provider>
  );
}
