import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bookingValidationSchema from "../validation/booking";

export const revalidate = 0;

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validation = bookingValidationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        message: `${validation.error.errors[0].path} ${validation.error.errors[0].message}`,
        status: 400,
      });
    }
    const property = await prisma.properties.findFirst({
      where: { id: body.propertyId },
    });

    if (!property) {
      return NextResponse.json({
        status: 400,
        message: "Property you are trying to book does not exist",
      });
    }
    const startDate = new Date(body.sdate);
    const endDate = new Date(body.edate);
    if (startDate >= endDate) {
      return NextResponse.json({
        status: 400,
        message: "Start date must be before end date",
      });
    }
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        propertyId: body.propertyId,
        progress: {
          in: ["pending", "confirmed"],
        },
        AND: [
          {
            sdate: {
              lte: endDate,
            },
          },
          {
            edate: {
              gte: startDate!,
            },
          },
        ],
      },
    });

    if (overlappingBookings.length > 0) {
      return NextResponse.json({
        status: 400,
        message: "Property is already booked for these dates",
        conflictingDates: overlappingBookings.map((booking) => ({
          start: booking.sdate,
          end: booking.edate,
          status: booking.progress,
        })),
      });
    }
    const booking = await prisma.booking.create({
      data: {
        sdate: startDate,
        edate: endDate,
        propertyId: body.propertyId,
        progress: "pending",
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
    console.error("Booking error:", err);
    return NextResponse.json({
      status: 500,
      message: "An unexpected error occurred while processing your booking",
    });
  }
};

export const GET = async (req: Request) => {
  const { searchParams }: any = new URL(req.url);
  const userId = searchParams?.get("user");
  const properties = await prisma.booking.findMany({
    where: {
      property: {
        userId: userId,
      },
      progress: "pending",
    },
  });
  return NextResponse.json({
    status: 200,
    data: properties,
  });
};
