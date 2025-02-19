"use client";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { getBooking } from "@/app/services/requests";

const Page = () => {
  const params: any = useParams();
  const reverationId = params?.id;
  const { data, isLoading, error } = useSWR([`${reverationId}`], () =>
    getBooking(reverationId)
  );
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading property details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-red-500">
          Error loading property details. Please try again.
        </p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Property not found.</p>
      </div>
    );
  }
  const property = data.data.property;
  const amenities = property.anemities || [];
  const getPropertyImage = (ptype: string) => {
    switch (ptype.toLowerCase()) {
      case "residential building":
        return "/residental.jpg";
      case "commercial building":
        return "/realestate.jpg";
      default:
        return "/land.jpg";
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{property.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={getPropertyImage(property.ptype)}
              alt={property.name}
              loading="lazy"
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold">{property.name}</h1>
                <p className="text-gray-600">{property.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  ${property.pricepermonth}/mo
                </p>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                  {property?.Booking?.length === 0 ||
                  property?.Booking?.some(
                    (booking: any) => booking?.progress === "available"
                  )
                    ? "Active"
                    : "Not available"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y">
              <div>
                <p className="text-gray-600">{property.measurement}</p>
                <p className="font-semibold">
                  {property.unitcount} {property.measurement}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Property Type</p>
                <p className="font-semibold">{property.ptype}</p>
              </div>
              <div>
                <p className="text-gray-600">Listed</p>
                <p className="font-semibold">
                  {formatDate(property.createdAt)}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                About this property
              </h2>
              <p className="text-gray-600">{property.description}</p>
            </div>
            {amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {amenities.map((amenity: string) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-sm shadow p-6 rounded">
          <span className="font-semibold text-lg">Requested by:</span>{" "}
          <span>{data.data?.fullname}</span>
          <p className="font-semibold mt-4 mb-2">Periaod</p>
          <hr />
          <div className="flex flex-col gap-2 mt-4">
            <p>
              Reservation start date:{" "}
              <span className="font-medium">{data.data?.sdate}</span>
            </p>
            <p>
              Reservation end date:{" "}
              <span className="font-medium">{data.data?.edate}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
