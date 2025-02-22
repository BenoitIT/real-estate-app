"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Authlayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session :any = useSession();
  const role = session?.data?.role;
  if (role?.toLowerCase().includes("host")) {
    return router.push("/dashboard");
  } else {
    return router.push("/properties");
  }
};
export default Authlayout;
