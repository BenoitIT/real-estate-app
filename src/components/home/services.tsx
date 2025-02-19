import Card from "../cards/card";
import { LuTableProperties } from "react-icons/lu";
import { RiReservedFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { SiAuthelia } from "react-icons/si";
import { FaHouseLaptop } from "react-icons/fa6";
export default function Services() {
  return (
    <section className="relative w-screen" id="service">
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-black opacity-90 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-6 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-full mx-auto px-[8vw]">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <p className="mb-4 text-3xl font-bold">Explore Our services</p>
            <p className=" text-gray-600 text-base leading-7">
              Rental booking provides a seamless rental booking experience for
              both renters and property owners. Our services include secure user
              authentication, effortless property listings, instant bookings,
              and reliable payment solutions. Whether {"you're"} looking to book
              your next stay or list a residential building, our platform makes
              the process smooth and efficient.
            </p>
            
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            <Card
              icon={<LuTableProperties />}
              title="Property Listings"
              description="
Easily list your residential building or rental space with detailed descriptions, images, and pricing."
            />
            <Card
              icon={<RiReservedFill />}
              title="Instant Booking"
              description="
Book rentals seamlessly with real-time availability and secure reservations."
            />
            <Card
              icon={<FaSearch />}
              title="Smart Search & Filters"
              description="
Find the perfect rental with advanced filters for location, price, and amenities."
            />
            <Card
              icon={<MdDashboardCustomize />}
              title="Booking & Earnings Dashboard"
              description="
Hosts can manage their listings, track bookings, and monitor earnings from one place."
            />
            <Card
              icon={<SiAuthelia />}
              title="Secure Authentication & User Profiles"
              description="
Register and log in effortlessly with Google Sign-In, with dedicated accounts for renters and hosts."
            />
            <Card
              icon={<FaHouseLaptop />}
              title="Properties management"
              description="
Property hosts should be able to create, update, and delete property listings"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
