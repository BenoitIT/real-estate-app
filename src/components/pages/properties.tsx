"use client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import TabularSection from "../ui/tabular-sections";
const Property = () => {
  const router = useRouter();
  const currentPath: string | null = usePathname();
  const handleAddNew = () => {
    router.push(`${currentPath}/new-property`);
  };
  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between mb-4 gap-2">
        <div className="flex gap-2 justify-end w-full">
          <Button onClick={handleAddNew} className="bg-emerald-900">Add new</Button>
        </div>
      </div>
    </div>
  );
};
export default TabularSection(Property);
