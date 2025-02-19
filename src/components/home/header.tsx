"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import MobileMenu from "./mobile-menu";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  const session: any = useSession();
  const role = session?.data?.role;
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  }
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-screen z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top
          ? "bg-white backdrop-blur-sm shadow-lg"
          : "text-emerald-900 font-semibold"
      }`}
    >
      <div className="w-full mx-auto px-[8vw]">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="shrink-0 mr-4 text-xl font-bold text-emerald-900 uppercase">
            rental booking
          </div>

          <div className="lg:flex hidden  gap-2 md:gap-4 w-full justify-center items-center text-sm lg:text-base">
            <Link
              href="/#about"
              className="hover:text-emerald-700 text-sm hover:font-semibold"
            >
              About us
            </Link>
            <Link
              href="/#services"
              className="hover:text-emerald-700 text-sm hover:font-semibold"
            >
              Services
            </Link>
            <Link
              href="/#contact"
              className="hover:text-emerald-700 text-sm hover:font-semibold"
            >
              Contact us
            </Link>
          </div>

          <nav className="hidden md:flex md:grow">
            <ul className="flex  justify-end flex-wrap items-center">
              <Link
                href="/signin"
                className={
                  role
                    ? "hidden"
                    : " text-gray-200 bg-emerald-900 hover:bg-green-700 ml-3 flex gap-1 w-[120px] p-2 rounded shadow"
                }
              >
                <span className="ml-3 text-sm">Sign in</span>
                <span className="mt-[2px]">
                  <IoIosArrowForward />
                </span>
              </Link>
              <button
                onClick={handleSignOut}
                className={
                  role
                    ? " text-gray-200 bg-emerald-900 hover:bg-green-700 ml-3 flex gap-1 w-[120px] p-2 rounded shadow"
                    : "hidden"
                }
              >
                <span className="ml-3 text-sm">Sign out</span>
                <span className="mt-[2px]">
                  <IoIosArrowForward />
                </span>
              </button>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
