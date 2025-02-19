import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bookingValidationSchema from "../validation/booking";
export const revalidate = 0;
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const checkPropertyNameExistance = await prisma.properties.findFirst({
      where: {
        id: body.propertyId,
      },
    });
    if (!checkPropertyNameExistance)
      return NextResponse.json({
        status: 400,
        message: "Property you are trying to book does not exist",
      });
    const validation = bookingValidationSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json({
        message:
          validation.error.errors[0].path +
          " " +
          validation.error.errors[0].message,
        status: 400,
      });
    const checkIfAllowedToBook = await prisma.properties.findFirst({
      where: {
        id: body.propertyId,
      },
    });
    const checkIfPropertyAllowedToBook = await prisma.booking.findFirst({
      where: {
        propertyId: body.propertyId,
      },
    });
    if (
      !checkIfAllowedToBook ||
      checkIfPropertyAllowedToBook?.progress === "available"
    )
      return NextResponse.json({
        status: 400,
        message: "Property you are trying to book is not available for now",
      });
    console.log("body", body);
    const booking = await prisma.booking.create({
      data: {
        sdate: body.sdate,
        edate: body.edate,
        propertyId: body.propertyId,
        progress: "awaiting",
        fullname: body.fullname,
        email: body.email || "",
        phone: body.phone,
        note: body.note,
        userId: body.userId,
      },
    });
    return NextResponse.json({
      status: 201,
      message: "Booking request is sent successfully",
      data: booking,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 400,
      message: "Unexpected error occurs",
    });
  }
};

export const GET = async (req: Request) => {
  const { searchParams } :any = new URL(req.url);
  const userId = searchParams?.get("user");
  const properties = await prisma.booking.findMany({
    where: {
      property: { userId: userId },
      progress: "awaiting",
    },
  });
  return NextResponse.json({
    status: 200,
    data: properties,
  });
};
