"use client";
import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { getProperty } from "@/app/services/property";
import { useParams } from "next/navigation";
import BookingForm from "@/components/forms/bookForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import ErrorSection from "@/components/error-section";

const PropertyDetailView = () => {
  const params :any = useParams();
  const router = useRouter();
  const propertyId = params?.id;
  const [loadinfo, setLoadInfo] = useState(false);
  const { data, isLoading, error } = useSWR(
    [`${propertyId}`, `${loadinfo}`],
    () => getProperty(propertyId)
  );
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorSection />;
  }

  if (!data?.data) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Property not found.</p>
      </div>
    );
  }
  const property = data.data;
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
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold mb-6">{property.name}</h1>
        <Button className="w-fit bg-emerald-900" onClick={() => router.back()}>
          back
        </Button>
      </div>
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
                    (booking :any) => booking?.progress === "available"
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
        {property?.Booking?.length === 0 ||
        property?.Booking?.some(
          (booking :any) => booking?.progress === "available"
        ) ? (
          <BookingForm setLoadInfo={setLoadInfo} />
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default PropertyDetailView;
