import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PropertyCard = () => {
  return (
    <Card className="max-w-md bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative w-full h-48">
        <Image 
          src="/residental.jpg"
          alt="property"
          loading='lazy'
          width={100}
          height={100}
          className="w-full h-full object-fit"
        />
      </div>
      <CardHeader className="pt-4 pb-2">
        <h2 className="text-xl font-semibold">Ambarukmo Square</h2>
        <p className="text-gray-600">3650 E Ambarukmo St, Jogja 85032</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-700">120 units,</span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
            Active
          </span>
          <span className="text-gray-600 text-sm">
            Updated Dec 5
          </span>
          <Link href="properties/property-id" className="text-emerald-800 text-sm ml-auto font-semibold">
            View more
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;