import Link from "next/link";

const year = new Date().getFullYear();

export const Footer = () => {
  const menus = [
    {
      name: "useful links",
      items: [
        { name: "About us", path: "" },
        { name: "services", path: "" },
        {
          name: "solutions",
          path: "",
        },
      ],
    },
    {
      name: "others",
      items: [
        {
          name: "Buildings",
          path: "",
        },
        {
          name: "Land and other fixied assets",
          path: "",
        },
      ],
    },
  ];
  return (
    <footer className="relative px-4 pt-8 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <div className="shrink-0 mr-4 text-xl font-bold text-emerald-900 uppercase mb-3">
              rental booking
            </div>
            <p className="font-normal text-blue-gray-500 lg:w-3/5 text-sm text-gray-600 leading-6">
              we provide a seamless rental booking experience for both renters
              and property owners. Our services include secure user
              authentication, effortless property listings and instant bookings
              Whether you're looking to book your next stay or list a
              residential building, our platform makes the process smooth and
              efficient.
            </p>
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <p
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase text-gray-600"
                >
                  {name}
                </p>
                <ul className="mt-3 text-sm text-gray-600">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center  w-full">
          <p className="text-sm text-gray-600 mr-4 text-center">
            &copy;Rental booking platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
