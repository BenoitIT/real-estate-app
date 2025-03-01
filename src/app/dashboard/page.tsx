"use client";
import React, { Suspense, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {  CreditCard, Activity } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/datepicker";
import { DateRange } from "react-day-picker";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getStatistics } from "../services/dashboard";
import Loader from "@/components/loader";
import ErrorSection from "@/components/error-section";

const Page = () => {
  const session :any = useSession();
  const userId = session?.data?.id;
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const { data, isLoading, error } = useSWR(
    date?.from && date?.to && userId && ["report", date.from, date.to],
    () =>
      getStatistics(
        userId,
        date?.from as unknown as string,
        date?.to as unknown as string
      )
  );
  if (data) {
    return (
      <div className="p-6 space-y-4 bg-gray-100 min-h-full rounded">
        <div className="w-full flex justify-end">
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white  text-zinc-950 border-zinc-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-950">
                My properties
              </CardTitle>
              <CreditCard className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-950">
                {Intl.NumberFormat("en-Us").format(data.data?.totalProperties)}
              </div>
              <p className="text-xs text-zinc-500">
                overall properties registred
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-zinc-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-950">
                Total pending request
              </CardTitle>
              <CreditCard className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-950">
                {Intl.NumberFormat("en-Us").format(data.data?.pendingBookings)}
              </div>
              <p className="text-xs text-zinc-950">From selected range</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-zinc-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-950">
                Total properties in-use
              </CardTitle>
              <CreditCard className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-950">
                {Intl.NumberFormat("en-Us").format(data.data?.propertiesInUse)}
              </div>
              <p className="text-xs text-zinc-500">From selected range</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-zinc-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-950">
                My clients count
              </CardTitle>
              <Activity className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-950">
                {Intl.NumberFormat("en-Us").format(data.data?.uniqueClients)}
              </div>
              <p className="text-xs text-zinc-500">From selected range</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-4 bg-white border-zinc-300">
            <CardHeader>
              <CardTitle className="text-zinc-950">
                Monthly statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data.data?.monthlyStats}>
                  <XAxis dataKey="month" stroke="#525252" fontSize={12} />
                  <YAxis
                    stroke="#525252"
                    fontSize={12}
                    tickFormatter={(income) => `$${income}`}
                  />
                  <Bar dataKey="income" fill="#B2BEB5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3 bg-white border-zinc-300">
            <CardHeader>
              <CardTitle className="text-zinc-950">Recent bookings</CardTitle>
              <div className="text-sm text-zinc-500">
                My most recent bookings.
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {data.data?.recentBookings?.map(
                  (
                    expense: {
                      propertyName: string;
                      clientName: string;
                      amount: string;
                      status: string;
                    },
                    i: number
                  ) => (
                    <div key={i} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium text-zinc-950">
                          {expense.clientName}
                        </p>
                        <p className="text-sm text-zinc-500">
                          <span>{expense.propertyName}</span>,{" "}
                          <span className="text-xs text-black">
                            {expense.status}
                          </span>
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-zinc-950">
                        $
                        {Intl.NumberFormat("en-Us").format(
                          Number(expense.amount)
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
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
