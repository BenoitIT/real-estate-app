import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const propertyId = req.url.split("properties/")[1];
    const propertyToDelete = await prisma.properties.delete({
      where: {
        id: propertyId,
      },
    });
    if (propertyToDelete) {
      return NextResponse.json({
        status: 200,
        message: "Property is deleted successfully",
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Property is not found",
    });
  } catch (err) {
    console.error(err)
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};
export const GET = async (req: Request) => {
  try {
    const propertyId = req.url.split("properties/")[1];
    const property = await prisma.properties.findFirst({
      where: {
        id: propertyId,
      },
      include:{
        Booking:true
      }
    });
    if (property) {
      return NextResponse.json({
        status: 200,
        data: property,
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
    const propertyId = req.url.split("properties/")[1];
    const body = await req.json();
    delete body.id;
    const Updatedproperty = await prisma.properties.update({
      where: {
        id: propertyId,
      },
      data: body,
    });
    if (Updatedproperty) {
      return NextResponse.json({
        status: 200,
        message: "Property's information are updated succesfully",
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Coud not find the property",
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "something went wrong",
    });
  }
};
