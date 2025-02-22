"use client";
import useSWR from "swr";
import { Suspense } from "react";
import { headers } from "@/components/table-headers/request";
import { usePathname, useRouter} from "next/navigation";
import Loader from "@/components/loader";
import ErrorSection from "@/components/error-section";
import Requests from "@/components/pages/requests";
import { useSession } from "next-auth/react";
import { getBookings } from "@/app/services/used";

const Page = () => {
  const session :any = useSession();
  const userId = session?.data?.id;
  const router = useRouter();
  const currentpath = usePathname();
  const { data, isLoading, error } = useSWR(userId && ["history", userId], () =>
    getBookings(userId)
  );
  const handleView = async (id: number | string) => {
    router.push(`${currentpath}/${id}`);
  };
  const actions = [
    {
      icon: (
        <span className="text-emerald-900 text-xs font-semibold hover:bg-green-100 hover:rounded hover:shadow">
          View
        </span>
      ),
      Click: handleView,
      name: "view",
    },
  ];
  if (data) {
    return (
      <div className="w-full">
        <Requests headers={headers} data={data?.data} action={actions} />
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorSection />;
  }

  return null;
};
const SuspensePage = () => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
);

export default SuspensePage;
