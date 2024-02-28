import BlogCard from "./BlogCard";
import Loader from "./Loader";

export default function Feed({blogs}) {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);



console.log(blogs)


  return (
    <div className="flex flex-col w-[70%] border-r border-slate-800">
      <div className="flex items-center border-b border-slate-800 h-[12em]">
        <h1 className="uppercase text-5xl font-bold header_text">Discover our latest blogs</h1>
      </div>
     {/* {loading && <div className="mt-10">
        <Loader />
      </div>} */}
      {
        blogs?.map((item)=> <BlogCard key={item.id} cardBody={item} withBody={true} />)
      }
    </div>
  );
}
