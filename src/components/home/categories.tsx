// Categories.tsx (Client Component)
"use client";

import Image from "next/image";
import Link from "next/link";

export const Categories = ({
  categories,
}: {
  categories: {
    totalAuctions: number;
    category: string;
    categoryImage: string;
  }[];
}) => {
  if (categories.length === 0) return null;

  return (
    <section className="py-[80px] text-black px-6 bg-[#232323] bg-opacity-30">
      <div className="max-w-container gap-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((item) => {
          const url = encodeURIComponent(item.category);
          return (
            <Link
              href={`/categories/${url}`}
              key={item.category}
              className="bg-white rounded-[4px] p-4"
            >
              <div className="w-full relative sm:w-[248px] h-[203px]">
                <Image
                  className="object-contain"
                  fill
                  alt={item.category}
                  src={item.categoryImage}
                />
              </div>
              <p className="font-medium text-sm">
                {item.category}{" "}
                <span className="text-[#A9AEB2] font-normal text-[12px]">
                  {item.totalAuctions}
                </span>
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
