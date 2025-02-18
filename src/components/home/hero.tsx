import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-screen bg-[url(/residental.jpg)] bg-cover bg-center bg-no-repeat">
      {/* Illustration behind hero content */}
      <div className="absolute z-1 size-full bg-white opacity-90"></div>
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1 hidden lg:block"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="w-full mx-auto px-[8vw] h-screen flex justify-center items-center">
        <div className="h-fit z-10">
          <div className="text-center lg:w-[1000px] md:w-[700px] w-[350px]">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-8"
              data-aos="zoom-y-out"
            >
              Rental Booking{" "}
              <span className="bg-clip-text text-transparent bg-emerald-900">
                Platform
              </span>
            </h1>
            <div className="max-w-full mx-auto">
              <p
                className="text-xl text-gray-500 mb-8 leading-8 text-center"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                {" "}
                Seamless rental booking platform designed for simplicity and
                efficiency. Whether you're listing properties or booking your
                next stay, our system ensures a smooth experience with secure
                authentication, easy property browsing, and instant bookings.
                Join us in redefining the way rentals work <br/> effortless, reliable,
                and built for you.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none flex justify-center gap-2 mt-6"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <Link
                    href="/#contact"
                    className="btn text-white bg-emerald-900 hover:bg-green-900 w-full mb-4 sm:w-auto sm:mb-0 rounded px-6 py-3 shadow"
                  >
                    Talk to us
                  </Link>
                </div>
                <div>
                  <Link
                    href="/#service"
                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4 rounded px-6 py-3 shadow"
                  >
                    Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center"></div>
        </div>
      </div>
    </section>
  );
}
