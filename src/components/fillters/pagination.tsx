import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-2 py-4 mt-4">
      <div className="flex items-center gap-1">
        <p className="text-sm text-gray-700 mr-2 hidden lg:block">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">7</span> of{" "}
          <span className="font-medium">24</span> results
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          className="hidden sm:inline-flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="hidden sm:flex gap-2">
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">4</Button>
        </div>
        <div className="sm:hidden text-sm text-gray-700">
          Page 1 of 4
        </div>

        <Button 
          variant="outline" 
          size="icon"
          className="hidden sm:inline-flex"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="flex gap-2 sm:hidden">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;