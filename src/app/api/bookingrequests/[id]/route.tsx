import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const bookingId = req.url.split("bookingrequests/")[1];
    const propertyBooking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
      },
      include: {
        property: true,
      },
    });
    if (propertyBooking) {
      return NextResponse.json({
        status: 200,
        data: propertyBooking,
      });
    }
    return NextResponse.json({
      status: 404,
      message: null,
    });
  } catch (err) {
    console.error(err)
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};
export const PUT = async (req: Request) => {
  try {
    const bookingId = req.url.split("bookingrequests/")[1];
    const booking = await prisma.booking.update({
      where: {
        id: bookingId,
        progress: "awaiting",
      },
      data: {
        progress: "booked",
      },
    });
    if (booking) {
      return NextResponse.json({
        status: 200,
        message: "Booking information are updated succesfully",
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
