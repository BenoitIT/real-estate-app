"use client";
import { cn } from "@/lib/utils";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { propertyInfo } from "@/interfaces/property";
import { createProperty } from "@/app/services/property";

const Page = () => {
  const router = useRouter();
  const [amenities, setAmenities] = useState<string[]>([]);
  const [newAmenity, setNewAmenity] = useState<string>("");
  const session :any = useSession();
  const [payload, setPayload] = useState<Partial<propertyInfo>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<propertyInfo>>({});
  const userId = session?.data?.id;
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setErrors((prevState: Partial<propertyInfo>) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setPayload((prevState: Partial<propertyInfo>) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    ErrorLogger(e.target.name, null);
  };
  const handleSelectTypeChange = (value: string) => {
    setPayload({ ...payload, ptype: value });
    setErrors((prevState: Partial<propertyInfo>) => ({
      ...prevState,
      ptype: "",
    }));
    ErrorLogger("ptype", null);
  };
  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };
  const handleRemoveAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const locationInput = form.elements.namedItem(
      "location"
    ) as HTMLInputElement;
    const measurementInput = form.elements.namedItem(
      "measurement"
    ) as HTMLInputElement;
    const unitcountInput = form.elements.namedItem(
      "unitcount"
    ) as HTMLInputElement;
    const priceInput = form.elements.namedItem(
      "pricepermonth"
    ) as HTMLInputElement;
    const ptypeInput = form.elements.namedItem("ptype") as HTMLInputElement;
    const descriptionInput = form.elements.namedItem(
      "description"
    ) as HTMLTextAreaElement;
    let hasError = false;
    if (!nameInput.value) {
      ErrorLogger("name", "Property name is required.");
      hasError = true;
    }
    if (!locationInput.value) {
      ErrorLogger("location", "Location is required.");
      hasError = true;
    }
    if (!measurementInput.value) {
      ErrorLogger("measurement", "Measurement unit is required.");
      hasError = true;
    }
    if (!unitcountInput.value) {
      ErrorLogger("unitcount", "Unit count is required.");
      hasError = true;
    }
    if (!priceInput.value) {
      ErrorLogger("pricepermonth", "Price per month is required.");
      hasError = true;
    }
    if (!ptypeInput.value) {
      ErrorLogger("ptype", "Property type is required.");
      hasError = true;
    }
    if (!descriptionInput.value) {
      ErrorLogger("description", "Description is required.");
      hasError = true;
    } else if (!payload.ptype) {
      ErrorLogger("ptype", "Property type should be selected.");
    } else {
      setLoading(true);
      try {
        payload.userId = userId;
        payload.anemities = amenities;
        payload.pricepermonth = Number(payload.pricepermonth);
        delete payload.id;
        const response = await createProperty(payload);
        if (response?.status === 201) {
          toast.success(response?.message);
          form.reset();
          router.back();
        } else {
          toast.error(response?.message || "Failed to create budget");
        }
      } catch (error) {
        console.error(error)
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className={"flex flex-col gap-6 mt-6"}>
      <b
        className="font-semibold text-base hover:cursor-pointer"
        onClick={() => router.back()}
      >
        Back
      </b>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 lg:mx-[20vw] md:mx-[10vw] mx-2">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold opacity-90">New property</h1>
                <p className="text-balance text-muted-foreground text-sm">
                  Fill the fields below
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Property name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="name of property..."
                  onChange={handleChange}
                />
                <span
                  className={errors?.name ? "text-xs text-red-500" : "hidden"}
                >
                  {errors?.name}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Property location</Label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="location of property..."
                  onChange={handleChange}
                />
                <span
                  className={
                    errors?.location ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.location}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Measurement Unit</Label>
                <Input
                  id="unit"
                  type="text"
                  name="measurement"
                  placeholder="ex:rooms, area ..."
                  onChange={handleChange}
                />
                <span
                  className={
                    errors?.measurement ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.measurement}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="measurement">Measurement count</Label>
                <Input
                  id="unit"
                  type="text"
                  name="unitcount"
                  placeholder="ex: 12, 10"
                  onChange={handleChange}
                />
                <span
                  className={
                    errors?.unitcount ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.unitcount}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="measurement">Price per night</Label>
                <Input
                  id="pricepermonth"
                  type="number"
                  name="pricepermonth"
                  placeholder="price..."
                  onChange={handleChange}
                />
                <span
                  className={
                    errors?.pricepermonth ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.pricepermonth}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Property type</Label>
                <Select name="ptype" onValueChange={handleSelectTypeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"hotel"}>
                      {"Hotel"}
                    </SelectItem>
                    <SelectItem value={"guest house"}>
                      {"Guest house"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <span
                  className={errors?.ptype ? "text-xs text-red-500" : "hidden"}
                >
                  {errors?.ptype}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amenities">Amenities</Label>
                <div className="flex gap-2">
                  <Input
                    id="amenities"
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    placeholder="Add amenity (e.g., WiFi, Parking, Pool)"
                  />
                  <Button
                    type="button"
                    onClick={handleAddAmenity}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full"
                    >
                      <span>{amenity}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(index)}
                        className="text-slate-500 hover:text-slate-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="write more..."
                  onChange={handleChange}
                />
                <span
                  className={
                    errors?.description ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.description}
                </span>
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-900"
                disabled={loading}
              >
                {loading ? "loading.." : "save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
