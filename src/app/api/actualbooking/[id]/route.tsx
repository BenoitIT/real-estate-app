import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const bookingId = req.url.split("actualbooking/")[1];
    const booking = await prisma.booking.update({
      where: {
        id: bookingId,
        progress: "booked",
      },
      data: {
        progress: "available",
      },
    });
    if (booking) {
      return NextResponse.json({
        status: 200,
        message: "Property is now available. it can be booked again!",
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Coud not find booking",
    });
  } catch (err) {
    console.log("errr", err);
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};
