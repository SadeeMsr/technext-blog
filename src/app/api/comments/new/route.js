import prisma from "../../../../utils/db.config";

export const POST = async (req) => {
    const reqBody = await req.json();
    try {
        const comment = await prisma.comment.create({
            data: reqBody,
          });

        return new Response(JSON.stringify(comment), { status: 200 })
    } catch (error) {
        return new Response("Failed to submit", { status: 500 })
    }
} 