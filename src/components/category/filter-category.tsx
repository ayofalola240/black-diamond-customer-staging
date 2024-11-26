"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosClient } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export const FilterCategory = ({ category }: { category: string }) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["Category"],
    queryFn: () =>
      axiosClient.get("/auctions/categories").then(
        (res) =>
          res.data as {
            categories: {
              category: string;
            }[];
          }
      ),
  });

  const categories = useMemo(() => {
    if (!data) return [];
    return data.categories.map((item) => item.category);
  }, [data]);

  return (
    <Select
      onValueChange={(value) => {
        router.push(`/categories/${encodeURIComponent(value)}`);
      }}
      name="category"
      defaultValue={category}
    >
      <SelectTrigger
        className={cn(
          "text-sm min-w-[200px] text-white bg-transparent h-[40px] font-normal rounded-[4px]"
        )}
      >
        <SelectValue placeholder={category} />
      </SelectTrigger>
      <SelectContent>
        {categories.map((item) => {
          return (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
