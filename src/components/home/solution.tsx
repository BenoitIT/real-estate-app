"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { TbBuildingCommunity } from "react-icons/tb";
import { BsBuildingFillCheck } from "react-icons/bs";
import { PiIsland } from "react-icons/pi";
import Link from "next/link";

export default function Solutions() {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="relative w-screen">
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16 w-full"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative w-full mx-auto px-[8vw]">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="mb-4 text-3xl font-bold">Explore the solutions</h1>
            <p className="text-lg text-gray-600">
              Instant Bookings, Verified Listings, Flexible Search & Filters,
              and 24/7 Support. Whether you're booking your next stay or listing
              your property to find renters faster, our platform makes the
              process effortless and efficient.
            </p>
          </div>
          <div className="md:grid md:grid-cols-12 md:gap-6 w-full">
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-3 lg:pr-10 xl:pr-12 mb-8">
                <h3 className="h3 mb-3 text-xl">Our Leading Solutions</h3>
                <p className="text-base text-gray-600">
                  Discover Innovative Solutions for Seamless Rentals: Instant
                  Bookings, Verified Listings, Secure Payments, Flexible Search
                  & Filters, and 24/7 Support. Each designed to simplify your
                  rental experience. Whether you're booking your next stay or
                  listing your property to find renters faster, our platform
                  makes the process effortless and efficient.
                </p>
              </div>
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-4 text-base">
                      Commercial building
                    </div>
                    <div className="text-gray-600 text-sm">
                      Looking for the perfect space to grow your business? Book
                      a commercial building with us and enjoy prime locations,
                      modern amenities, and tailored solutions for your needs.
                      Don't miss the opportunity to elevate your brand
                    </div>
                    <div className="w-full flex justify-end text-sm font-bold text-emerald-900 hover:text-emerald-700 mt-2">
                      <Link href={""}>Explore now</Link>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 text-emerald-700 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <BsBuildingFillCheck />
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-4 text-base">
                      Residential building
                    </div>
                    <div className="text-gray-600 text-sm">
                      Discover the perfect blend of comfort, style, and
                      convenience in our residential properties. Whether you're
                      looking for a cozy single-family home, a spacious
                      apartment, or a modern townhouse, we have options to suit
                      every lifestyle. With prime locations, quality
                      construction, and amenities designed for modern living,
                      our residential buildings are more than just houses.
                      they're homes! Start your journey to a better living
                      experience today
                    </div>
                    <div className="w-full flex justify-end text-sm font-bold text-emerald-900 hover:text-emerald-700 mt-2">
                      <Link href={""}>Explore now</Link>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 text-emerald-700 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <TbBuildingCommunity />
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 3
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-4 text-base">
                      Land
                    </div>
                    <div className="text-gray-600 text-sm">
                      Discover premium land opportunities perfect for building,
                      farming, or future investment. Land is the foundation of
                      your vision, and booking now ensures you secure the ideal
                      location for your goals. Start your journey with us today
                    </div>
                    <div className="w-full flex justify-end text-sm font-bold text-emerald-900 hover:text-emerald-700 mt-2">
                      <Link href={""}>Explore now</Link>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 text-emerald-700 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <PiIsland />
                  </div>
                </a>
              </div>
            </div>
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1 pt-[10vh]">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  <Transition
                    show={tab === 1}
                    appear={true}
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto rounded"
                        src={"/commerc.jpg"}
                        width={500}
                        height="500"
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                  <Transition
                    show={tab === 2}
                    appear={true}
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto rounded"
                        src={"/residental.jpg"}
                        width={500}
                        height="500"
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                  <Transition
                    show={tab === 3}
                    appear={true}
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto rounded"
                        src={"/land.jpg"}
                        width={500}
                        height="500"
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
