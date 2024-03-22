import { NextResponse, userAgent } from "next/server";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return NextResponse.json(
        {
          user: null,
          error: "User with that email already exists.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name: name,
        password: passwordHash,
      },
    });

    const { password: newUserPassword, ...user } = newUser;

    return NextResponse.json({
      user: user,
      message: "User created successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        user: null,
        error: "Something wrong!",
      },
      { status: 201 }
    );
  }
}
