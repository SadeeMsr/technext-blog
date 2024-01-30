import { IoSearchOutline } from "react-icons/io5";

export default function Search() {
  return (
    <div className="h-[12rem] w-full flex items-center justify-center">
        <div className="flex gap-5 border rounded-full p-4 w-full">
            <IoSearchOutline size={20} className="text-slate-400" />
            <input type="text" className="bg-transparent outline-none" placeholder="Search blogs" />
        </div>
    </div>
  )
}
