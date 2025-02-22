import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;

export const GET = async (req: Request) => {
  const searchParm: any = new URL(req.url);
  const search = searchParm?.searchParams?.get("search") || "";
  const properties = await prisma.properties.findMany({
    where: {
      OR: [
        { description: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { ptype: { contains: search, mode: "insensitive" } },
      ],
    },
    include: {
      Booking: true,
    },
  });
  return NextResponse.json({
    status: 200,
    data: properties,
  });
};
