"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/usedebounce";
import { useSearchParams, useRouter } from "next/navigation";

const PropertyFilters = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const search = searchParam?.get("search") || "";
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedValue] = useDebounce(searchValue, 100);
  const searchPropertyHandler = () => {
    const params = new URLSearchParams(searchParam!);
    if (debouncedValue != "") {
      params.set("search", debouncedValue);
      router.replace(`?${params.toString()}`);
    } else {
      params.set("search", "");
      router.replace(`?${params.toString()}`);
    }
    return;
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchPropertyHandler();
    }
  };
  return (
    <div className="w-full mb-6 space-y-4 flex justify-between">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search properties..."
            className="pl-10"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <Button
          variant="outline"
          type="button"
          className="flex items-center gap-2"
          onClick={searchPropertyHandler}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select onValueChange={(value) => setSearchValue(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value=" ">Hotel</SelectItem>
            <SelectItem value=" ">Guest house</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={searchPropertyHandler}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
