import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const PropertyDetailView = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Property name</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/residental.jpg"
              alt="Property"
              loading="lazy"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold">Ambarukmo Square</h1>
                <p className="text-gray-600">
                  3650 E Ambarukmo St, Jogja 85032
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$2,500/mo</p>
                <span className="text-green-600 text-sm">Active</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y">
              <div>
                <p className="text-gray-600">Units</p>
                <p className="font-semibold">120 units</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                About this property
              </h2>
              <p className="text-gray-600">
                Modern apartment complex featuring contemporary design and
                premium amenities. Each unit comes with high-end finishes, smart
                home features, and stunning city views. The building includes a
                fitness center, rooftop lounge, and 24/7 security.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "Fitness Center",
                  "Pool",
                  "Parking",
                  "Pet Friendly",
                  "Security",
                  "Laundry",
                ].map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader className="pb-4">
              <h3 className="text-xl font-semibold">Book this property</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <div className="relative">
                  <Input type="date" className="w-full" />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preferred End Date</Label>
                <div className="relative">
                  <Input type="date" className="w-full" />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="your@email.com" />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" placeholder="Your phone number" />
              </div>
              <div className="space-y-2">
                <Label>Message (Optional)</Label>
                <textarea
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Any specific requirements or questions?"
                />
              </div>
              <Button className="w-full bg-emerald-900">Confirm Booking</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailView;
