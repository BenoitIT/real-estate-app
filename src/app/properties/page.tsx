"use client";

import useSWR from "swr";
import { useState } from "react";
import PropertyCard from "@/components/cards/property";
import Pagination from "@/components/fillters/pagination";
import PropertyFilters from "@/components/fillters/productFilters";
import { getProperties } from "../services/property";
import { useSession } from "next-auth/react";

// Define property interface to match your payload
interface Property {
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
  Booking:any[];
  updatedAt: string;
}

const Page = () => {
  const session: any = useSession();
  const userid = session?.data?.id;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Adjust as needed
  
  const { data, isLoading, error } = useSWR(
    userid ? "properties" : null,
    () => getProperties(userid)
  );
  
  console.log("data", data?.data);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Loading properties...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading properties. Please try again.</p>
      </div>
    );
  }
  
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="mx-auto container px-2 w-full py-4">
        <p className="font-semibold text-3xl py-4 text-gray-800">
          Properties List
        </p>
        <PropertyFilters />
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">No properties found.</p>
        </div>
      </div>
    );
  }
 
  const properties: Property[] = data.data;
  const totalProperties = properties.length;
  const totalPages = Math.ceil(totalProperties / itemsPerPage);
  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div className="mx-auto container px-2 w-full py-4">
      <p className="font-semibold text-3xl py-4 text-gray-800">
        Properties List
      </p>
      <PropertyFilters />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="w-full flex justify-end mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Page;