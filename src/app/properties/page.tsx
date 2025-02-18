import PropertyCard from "@/components/cards/property";
import Pagination from "@/components/fillters/pagination";
import PropertyFilters from "@/components/fillters/productFilters";

const Page = () => {
  return (
    <div className="mx-auto  container px-2  w-full py-4">
      <p className="font-semibold text-3xl py-4 text-gray-800">
        Properties List
      </p>
      <PropertyFilters />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>
      <div className="w-full flex justify-end">
        <Pagination />
      </div>
    </div>
  );
};
export default Page;
