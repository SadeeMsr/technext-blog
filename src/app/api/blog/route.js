import prisma from "../../../utils/db.config";

export const GET = async (req) => {
  try {
    const blogs = await prisma.blog.findMany();

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all blogs", { status: 500 });
  }
};
