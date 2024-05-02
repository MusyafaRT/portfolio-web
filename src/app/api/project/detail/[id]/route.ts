import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);

    if (!projectId) {
      return NextResponse.json({
        projects: null,
        message: "Project ID is required",
        status: 400,
      });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        author: true,
      },
    });

    if (!project) {
      return NextResponse.json({
        projects: null,
        message: "Project not found",
        status: 404,
      });
    }

    return NextResponse.json({
      project,
    });
  } catch (error) {
    return NextResponse.json({
      projects: null,
      error: error.message,
      status: 500, // Internal server error
    });
  }
}
