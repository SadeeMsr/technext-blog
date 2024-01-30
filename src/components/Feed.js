"use client";
import { useEffect, useState } from "react";
import { filterRecipes } from "@/lib/Filters";
import BlogCard from "./BlogCard";
import Loader from "./Loader";

export default function Feed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const getBlogs = async () => {
    setLoading(true)
    const response = await fetch("/api/blog");
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    getBlogs();
    setLoading(false)
  }, []);



  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterRecipes(e.target.value, data);
        setSearchedResults(searchResult);
      }, 500)
    );
  };


  return (
    <div className="flex flex-col w-[70%] border-r border-slate-800">
      <div className="flex items-center border-b border-slate-800 h-[12em]">
        <h1 className="uppercase text-5xl font-bold header_text">Discover our latest blogs</h1>
      </div>
     {loading && <div className="mt-10">
        <Loader />
      </div>}
      {
        data?.map((item)=> <BlogCard key={item.id} cardBody={item} withBody={true} />)
      }
    </div>
  );
}
