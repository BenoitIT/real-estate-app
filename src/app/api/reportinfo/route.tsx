import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const userId = searchParams.get("user");
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const start = startDate
    ? new Date(startDate)
    : new Date(`${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`);
    
  const end = endDate
    ? new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1))
    : new Date(`${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-01`);
  const totalProperties = await prisma.properties.count({
    where: {
      userId:userId!,
    },
  });
  const pendingBookings = await prisma.booking.count({
    where: {
      userId:userId!,
      progress: "pending",
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });
  const propertiesInUse = await prisma.booking.count({
    where: {
      userId:userId!,
      progress: "active",
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });
  const uniqueClients = await prisma.booking.count({
    where: {
      userId:userId!,
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });
  const months = Array.from({ length: 12 }, (_, i) => i);
  const monthlyStats = await Promise.all(
    months.map(async (month) => {
      const monthStart = new Date(currentYear, month, 1);
      const monthEnd = new Date(currentYear, month + 1, 0);

      const [pending, active, completed] = await Promise.all([
        prisma.booking.count({
          where: {
           userId:userId!,
            progress: "pending",
            createdAt: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        }),
        prisma.booking.count({
          where: {
           userId:userId!,
            progress: "active",
            createdAt: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        }),
        prisma.booking.count({
          where: {
           userId:userId!,
            progress: "completed",
            createdAt: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        }),
      ]);

      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      return {
        month: monthNames[month],
        pending,
        active,
        completed,
      };
    })
  );
  const recentBookings = await prisma.booking.findMany({
    where: {
      userId:userId!,
    },
    include: {
      property: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  const formattedRecentBookings = recentBookings.map(booking => ({
    propertyName: booking.property.name,
    clientName: booking.fullname,
    startDate: booking.sdate,
    endDate: booking.edate,
    status: booking.progress,
    amount: booking.property.pricepermonth,
  }));

  return NextResponse.json({
    status: 200,
    data: {
      totalProperties,
      pendingBookings,
      propertiesInUse,
      uniqueClients,
      monthlyStats,
      recentBookings: formattedRecentBookings,
    },
  });
};