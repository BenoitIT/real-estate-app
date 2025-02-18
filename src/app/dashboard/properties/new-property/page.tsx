"use client";
import { cn } from "@/lib/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import { BudgetInfo } from "@/interfaces/budget";
import { createBuget } from "@/app/services/budget";
import { Textarea } from "@/components/ui/textarea";

const Page = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();
  const [years, setYears] = useState<number[]>([]);
  const session: any = useSession();
  const [payload, setPayload] = useState<BudgetInfo>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<BudgetInfo>({});
  const userId = session?.data?.id;
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setErrors((prevState: BudgetInfo) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPayload((prevState: BudgetInfo) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    ErrorLogger(e.target.name, null);
  };
  const handleSelectYearChange = (value: string) => {
    setPayload({ ...payload, year: Number(value) });
    setErrors((prevState: BudgetInfo) => ({
      ...prevState,
      year: "",
    }));
    ErrorLogger("year", null);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const Amount = form.elements.namedItem("budgetAmount") as HTMLInputElement;
    if (Amount.value == "") {
      ErrorLogger("budgetAmount", "Amount is required.");
    } else if (!payload.year) {
      ErrorLogger("year", "Year should be selected.");
    } else {
      setLoading(true);
      try {
        payload.userId = userId;
        delete payload.id;
        delete payload.remainingAmount;
        delete payload.spentAmount;
        const response = await createBuget(payload);
        if (response?.status === 201) {
          toast.success(response?.message);
          form.reset();
          router.back();
        } else {
          toast.error(response?.message || "Failed to create budget");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    function getNext50Years() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = 0; i < 50; i++) {
        years.push(currentYear + i);
      }
      setYears(years);
    }
    getNext50Years();
  }, []);
  return (
    <div className={cn("flex flex-col gap-6 mt-6", className)} {...props}>
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
                  className={errors?.year ? "text-xs text-red-500" : "hidden"}
                >
                  {errors?.year}
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
                  className={errors?.year ? "text-xs text-red-500" : "hidden"}
                >
                  {errors?.year}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Measurement Unit</Label>
                <Input
                  id="unit"
                  type="text"
                  name="unit"
                  placeholder="ex:rooms, area ..."
                  onChange={handleChange}
                />
                <span
                  className={errors?.year ? "text-xs text-red-500" : "hidden"}
                >
                  {errors?.year}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="measurement">Measurement count</Label>
                <Input
                  id="unit"
                  type="text"
                  name="unit"
                  placeholder="ex:rooms, area ..."
                  onChange={handleChange}
                />
                <span
                  className={errors?.year ? "text-xs text-red-500" : "hidden"}
                >
                  {errors?.year}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="measurement">Price per month</Label>
                <Input
                  id="pricepermonth"
                  type="number"
                  name="pricepermonth"
                  placeholder="price..."
                  onChange={handleChange}
                />
                <span
                  className={errors?.year ? "text-xs text-red-500" : "hidden"}
                >
                  {errors?.year}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Property type</Label>
                <Select name="type" onValueChange={handleSelectYearChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Commercial building"}>
                      {"Commercial building"}
                    </SelectItem>
                    <SelectItem value={"Residential building"}>
                      {"Residential building"}
                    </SelectItem>
                    <SelectItem value={"Land"}>{"Land"}</SelectItem>
                  </SelectContent>
                </Select>
                <span
                  className={
                    errors?.budgetAmount ? "text-xs text-red-500" : "hidden"
                  }
                >
                  {errors?.budgetAmount}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="write more..."
                  // onChange={handleChange}
                />
                <span
                  className={errors?.year ? "text-xs text-red-500" : "hidden"}
                >
                  {errors?.year}
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
