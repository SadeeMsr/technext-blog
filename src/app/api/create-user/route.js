import prisma from "../../../utils/db.config";

export const POST = async (req) => {
    const reqBody = await req.json();
    try {
        const user = await prisma.user.create({
            data: reqBody,
          });

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(user), { status: 500 })
    }
} 