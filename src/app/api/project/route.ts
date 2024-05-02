import { NextResponse } from "next/server";
import prisma from "../lib/prisma";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

interface RequestBody {
  title: string;
  type: string;
  content: string;
  authorId: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  try {
    const formData = await request.formData();

    const title = formData.get("title").toString();
    const type = formData.get("type").toString();
    const content = formData.get("content").toString();
    const authorId = formData.get("authorId").toString();
    const image = formData.get("image") as File;

    if (!title || !type || !content) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    const fileBuffer = await image.arrayBuffer();

    const blob = await put(filename, fileBuffer, {
      access: "public",
    });

    const result = await prisma.project.create({
      data: {
        title,
        type,
        content,
        image: blob.url,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });

    return NextResponse.json({
      project: result,
      message: "Project created successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error uploading repository:", error);
    return NextResponse.json({
      project: null,
      message: error.message,
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      project: projects,
      message: "Projects retrieved successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      project: null,
      error: error.message,
      status: 500, // Internal server error
    });
  }
}
