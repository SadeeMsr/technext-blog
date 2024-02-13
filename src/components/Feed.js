"use client";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Loader from "./Loader";
import { fetchBlogs } from "@/redux/actions/blogs.action";
import { connect } from "react-redux";

function Feed(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  props.fetchBlogs();

  useEffect(() => {
    setData(props.blogs);
  }, []);

  console.log("blogs 11", props);

  return (
    <div className="flex flex-col w-[70%] border-r border-slate-800">
      <div className="flex items-center border-b border-slate-800 h-[12em]">
        <h1 className="uppercase text-5xl font-bold header_text">
          Discover our latest blogs
        </h1>
      </div>
      {loading && (
        <div className="mt-10">
          <Loader />
        </div>
      )}
      {data?.map((item) => (
        <BlogCard key={item.id} cardBody={item} withBody={true} />
      ))}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    blogs: state.allBlogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogs: () => dispatch(fetchBlogs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
