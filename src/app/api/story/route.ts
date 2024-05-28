import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import prisma from "../lib/prisma";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  try {
    const formData = await request.formData();
    const authorId = formData.get("authorId").toString();
    const image = formData.get("image") as File;

    const fileBuffer = await image.arrayBuffer();

    const blob = await put(filename, fileBuffer, {
      access: "public",
    });

    const result = await prisma.story.create({
      data: {
        contentImage: blob.url,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });

    return NextResponse.json({
      story: result,
      message: "Story created successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error uploading repository:", error);
    return NextResponse.json({
      story: null,
      message: error.message,
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  try {
    const stories = await prisma.story.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      story: stories,
      message: "stories retrieved successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      story: null,
      error: error.message,
      status: 500, // Internal server error
    });
  }
}
