import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const message = await prisma.message.create({
      data: {
        title: body.title || "",
        senderemail: body.senderemail || "",
        message: body.message || " ",
      },
    });
    return NextResponse.json({
      status: 201,
      message: "Your message is sent successfully",
      data: message,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 400,
      message: "Unexpected error occurs",
    });
  }
};
