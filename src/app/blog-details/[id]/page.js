import BlogDetails from "@/components/BlogDetails";
// import Comments from "@/components/Comments";



export default function page({ params }) {
  return (
    <div className="flex">
        <BlogDetails postId={params?.id} />
        {/* <Comments postId={params?.id} /> */}
    </div>
  )
}
