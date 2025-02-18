import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import propertyValidationSchema from "../validation/properties";
export const revalidate = 0;
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const inpuValidation = propertyValidationSchema.safeParse(body);
    if (!inpuValidation.success)
      return NextResponse.json({
        message:
          inpuValidation.error.errors[0].path +
          " " +
          inpuValidation.error.errors[0].message,
        status: 400,
      });
    const checkNameExistance = await prisma.properties.findFirst({
      where: {
        userId: body.userId,
        name: body.name,
      },
    });
    if (checkNameExistance)
      return NextResponse.json({
        status: 400,
        message: "Another property with this name already exist.",
      });
    const property = await prisma.properties.create({ data: body });
    return NextResponse.json({
      status: 201,
      message: `${body.name} is registered successfully`,
      data: property,
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
  const searchParm: any = new URL(req.url);
  const userId = searchParm?.searchParams?.get("user");
  const properties = await prisma.properties.findMany({
    where: {
      userId: userId,
    },
  });
  return NextResponse.json({
    status: 200,
    data: properties,
  });
};
