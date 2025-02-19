"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { Calendar } from "lucide-react";
import { createBookingRequests } from "@/app/services/requests";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const BookingForm = ({setLoadInfo}:{setLoadInfo:(value:boolean)=>void}) => {
    const params: any = useParams();
  const propertyId = params?.id;
  const session: any = useSession();
  const userid = session?.data?.id;
  const [payload, setPayload] = useState({
    sdate: "",
    edate: "",
    fullname: "",
    email: "",
    phone: "",
    note: "",
    propertyId:"",
    userId:""
  });

  const [errors, setErrors] = useState({
    sdate: "",
    edate: "",
    fullname: "",
    email: "",
    phone: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let hasError = false;
    const newErrors = {
      sdate: "",
      edate: "",
      fullname: "",
      email: "",
      phone: "",
    };

    if (!payload.sdate) {
      newErrors.edate = "Preferred date is required.";
      hasError = true;
    }
    if (!payload.edate) {
      newErrors.edate = "Preferred end date is required.";
      hasError = true;
    }
    if (!payload.fullname) {
      newErrors.fullname = "Full name is required.";
      hasError = true;
    }
    if (!payload.email) {
      newErrors.email = "Email is required.";
      hasError = true;
    }
    if (!payload.phone) {
      newErrors.phone = "Phone number is required.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
        payload.propertyId=propertyId;
        payload.userId=userid;
      const response = await createBookingRequests(payload);
      if (response?.status === 201) {
        toast.success("Reservation request is sent successfully");
        setLoadInfo(true)
      } else {
        toast.error(response?.message || "Failed to send request");
      }
    }
  };

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-4">
        <CardHeader className="pb-4">
          <h3 className="text-xl font-semibold">Book this property</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <div className="relative">
                <Input
                  type="date"
                  name="sdate"
                  value={payload.sdate}
                  onChange={handleChange}
                  className="w-full"
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                {errors.edate && (
                  <span className="text-xs text-red-500">
                    {errors.edate}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preferred End Date</Label>
              <div className="relative">
                <Input
                  type="date"
                  name="edate"
                  value={payload.edate}
                  onChange={handleChange}
                  className="w-full"
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                {errors.edate && (
                  <span className="text-xs text-red-500">
                    {errors.edate}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                name="fullname"
                placeholder="Your name"
                value={payload.fullname}
                onChange={handleChange}
              />
              {errors.fullname && (
                <span className="text-xs text-red-500">{errors.fullname}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={payload.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-xs text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                value={payload.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="text-xs text-red-500">{errors.phone}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label>Message (Optional)</Label>
              <textarea
                name="note"
                placeholder="Any specific requirements or questions?"
                value={payload.note}
                onChange={handleChange}
                className="w-full min-h-[100px] p-2 border rounded-md"
              />
            </div>
            <Button className="w-full bg-emerald-900" type="submit">
              Confirm Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
