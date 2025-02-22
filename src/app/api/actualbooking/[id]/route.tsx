import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const bookingId = req.url.split("actualbooking/")[1];
    const booking = await prisma.booking.update({
      where: {
        id: bookingId,
        progress: "confirmed",
      },
      data: {
        progress: "canceled",
      },
    });
    if (booking) {
      return NextResponse.json({
        status: 200,
        message: "Property reservation is now canceled. it can be  confirmed again!",
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
