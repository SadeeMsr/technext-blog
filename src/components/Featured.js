import FavoriteBlogs from "./FavoriteBlogs";
import Search from "./Search";

export default function Featured() {
  return (
    <div className="w-[30%] ps-10">
        <Search />
        <FavoriteBlogs />
    </div>
  )
}
