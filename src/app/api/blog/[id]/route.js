import prisma from "../../../../utils/db.config";

export const GET = async (request, { params }) => {
    try {
      const Blog = await prisma.blog.findUnique({
        where: {
          id: Number(params?.id),
        },
      });
  
      return new Response(JSON.stringify(Blog), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch Blog", { status: 500 });
    }
  };


  export const PATCH = async (request, { params }) => {
    const requestBody = await request.json();
  
    try {
      const updateBlog = await prisma.blog.update({
        where: {
          id: Number(params?.id),
        },
        data: requestBody,
      });
  
      return new Response(JSON.stringify(updateBlog), { status: 200 });
    } catch (error) {
      return new Response("Error Updating Blog", { status: 500 });
    }
  };



  export const DELETE = async (request, { params }) => {
    try {
      await prisma.blog.delete({
        where: {
          id: Number(params?.id),
        },
      })
        return new Response("Blog deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting blog", { status: 500 });
    }
  };