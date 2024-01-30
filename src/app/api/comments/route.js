import prisma from "../../../utils/db.config";

export const GET = async (req) => {
  try {
    const comments = await prisma.comment.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          blog: {
            select: {
              title: true,
              body: true,
              coverImg: true,
            },
          },
        },
      });
  
      const formattedComments = comments.map((comment) => ({
        body: comment.body,
        createdAt: comment.createdAt.toISOString(),
        email: comment.user.email,
        name: comment.user.name,
        image: comment.user.image,
        id: comment.id,
        postId: comment.postId
      }));
  

    return new Response(JSON.stringify(formattedComments), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Comments", { status: 500 });
  }
};


export const PATCH = async (request) => {
    const requestBody = await request.json();
  
    try {
      const updateComment = await prisma.comment.update({
        where: {
          id: Number(requestBody?.id),
        },
        data: requestBody,
      });
  
      return new Response(JSON.stringify(updateComment), { status: 200 });
    } catch (error) {
      return new Response("Error Updating Comment", { status: 500 });
    }
  };


  export const DELETE = async (request) => {
    const requestBody = await request.json();
    console.log(requestBody)
    try {
      await prisma.comment.delete({
        where: {
          id: Number(requestBody?.id),
        },
      })
        return new Response("Comment deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting comment", { status: 500 });
    }
  };