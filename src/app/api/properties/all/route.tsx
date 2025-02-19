import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;

export const GET = async () => {
  const properties = await prisma.properties.findMany({
    include: {
      Booking: true,
    },
  });
  return NextResponse.json({
    status: 200,
    data: properties,
  });
};
