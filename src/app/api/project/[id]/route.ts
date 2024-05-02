import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { put } from "@vercel/blob";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const result = await prisma.project.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Project deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      project: null,
      error: error.message,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");
    const id = parseInt(params.id);
    const formData = await request.formData();

    const title = formData.get("title").toString();
    const type = formData.get("type").toString();
    const content = formData.get("content").toString();
    const image = formData.get("image") as File;

    let imageDataUrl;
    if (image) {
      const fileBuffer = await image.arrayBuffer();
      const blob = await put(filename, fileBuffer, {
        access: "public",
      });
      imageDataUrl = blob.url;
    }

    const result = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        title,
        type,
        content,
        image: imageDataUrl,
      },
    });

    return NextResponse.json({
      project: result,
      message: "Project updated successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      project: null,
      error: error.message,
    });
  }
}
