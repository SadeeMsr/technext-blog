"use client"
import { useContext } from "react";
import { SessionStorageContext } from "@/ContextProviders/SessionStorageProvider";
import BlogCard from "./BlogCard";

export default function FavoriteBlogs() {
  const { data, removeData } = useContext(SessionStorageContext);

  return (
    <div>
        <h1 className="header_text text-2xl font-bold">
            My Today's Favorite
        </h1>
        <div className="mt-5">
          {
            data?.map((item) => <BlogCard key={item.id} cardBody={item} removeData={removeData} />)
          }
        </div>
    </div>
  )
}
