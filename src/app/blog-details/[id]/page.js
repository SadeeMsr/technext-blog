import { cookieBasedClient } from "@/utils/amplifyServerUtils";
import BlogDetails from "@/components/BlogDetails";
import { getPost } from "@/graphql/queries";
// import Comments from "@/components/Comments";



export default async function page({ params }) {
  const { id } = params;
  const blog = await cookieBasedClient.graphql({ query: getPost, variables: {id} });


  return (
    <div className="flex">
  
        <BlogDetails blog={blog.data.getPost} />
        {/* <Comments postId={params?.id} /> */}
    </div>
  )
}
