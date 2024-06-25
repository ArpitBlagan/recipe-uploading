import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  console.log(url);
  const postId = url.href.split("=").pop();
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(comments);
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
