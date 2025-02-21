import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
interface PropertyProps {
  property: {
    id: string;
    userId: string;
    name: string;
    ptype: string;
    location: string;
    measurement: string;
    unitcount: string;
    pricepermonth: string;
    description: string;
    anemities: string[];
    createdAt: string;
    updatedAt: string;
    Booking: any[];
  };
}

const PropertyCard = ({ property }: PropertyProps) => {
  const updatedDate = new Date(property.updatedAt);
  const formattedDate = `${updatedDate.toLocaleString("default", {
    month: "short",
  })} ${updatedDate.getDate()}`;
  const getPropertyImage = (ptype: string) => {
    switch (ptype.toLowerCase()) {
      case "hotel":
        return "/residental.jpg";
      default:
        return "/realestate.jpg";
    }
  };

  return (
    <Card className="max-w-md bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={getPropertyImage(property.ptype)}
          alt={property.name}
          loading="lazy"
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pt-4 pb-2">
        <h2 className="text-xl font-semibold">{property.name}</h2>
        <p className="text-gray-600">{property.location}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-700">
            {property.unitcount} {property.measurement},
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
            {"Active"}
          </span>
          <span className="text-gray-600 text-sm">Updated {formattedDate}</span>
          <Link
            href={`properties/${property.id}`}
            className="text-emerald-800 text-sm ml-auto font-semibold"
          >
            View more
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
