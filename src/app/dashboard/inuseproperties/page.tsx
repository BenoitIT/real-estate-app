"use client";
import useSWR from "swr";
import {  useState, Suspense } from "react";
import { headers } from "@/components/table-headers/request";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/loader";
import ErrorSection from "@/components/error-section";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Requests from "@/components/pages/requests";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { UpdateAccount } from "@/app/services/in-use-properties";
import { getInuseProperties } from "@/app/services/in-use-properties";

const Page = () => {
  const session :any = useSession();
  const [rowId, setRowId] = useState<any>();
  const [action, setRespondAction] = useState(false);
  const userId = session?.data?.id;
  const router = useRouter();
  const currentpath = usePathname();
  const { data, isLoading, error } = useSWR(
    userId && ["in-use", userId, action],
    () => getInuseProperties(userId)
  );
  const handleView = async (id: number | string) => {
    router.push(`${currentpath}/${id}`);
  };
  const handleGetId = async (id: number) => {
    setRowId(id);
  };
  const handleConfirmReservationFinish = async (id: string) => {
    try {
      const response = await UpdateAccount(id);
      toast.success(response?.message);
      setRespondAction(!action);
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept this reservetion");
    }
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
    {
      icon: (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <span className="text-emerald-900 text-xs font-semibold hover:bg-green-100 hover:rounded hover:shadow">
              marks as released
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className=" text-black">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-black opacity-65">
                This action cannot be undone. This will mark the end of
                reservation period.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className=" text-white bg-gray-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleConfirmReservationFinish(rowId);
                }}
                className="bg-emerald-900"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
      Click: handleGetId,
      name: "delete",
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
