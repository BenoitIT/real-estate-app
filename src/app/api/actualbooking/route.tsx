import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";

export const revalidate = 0;
export const GET = async (req: Request) => {
  const { searchParams } :any = new URL(req.url);
  const userId = searchParams?.get("user");
  const properties = await prisma.booking.findMany({
    where: {
      userId: userId,
      progress: "confirmed",
    },
  });
  return NextResponse.json({
    status: 200,
    data: properties,
  });
};
