"use client";

import { MoveUpRight } from "lucide-react";
import { AuctionItem, Empty } from "../shared";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Routes } from "@/lib/utils";
import { TInventory } from "@/types";
interface AuctionItemsProps {
  auctions: TInventory[];
  category?: string;
}

export const AuctionItems = ({ auctions, category }: AuctionItemsProps) => {
  // Filter auctions by category if provided
  const filteredAuctions = category
    ? auctions.filter((auction) => auction.category === category)
    : auctions;

  if (filteredAuctions.length === 0) {
    return (
      <Empty
        title="Auction To Begin Soon!"
        description="The Black Diamond Foundation Auction would start momentarily"
        iconUrl="/svgs/black-logo.svg"
        linkText="Refresh"
        link={Routes.Home}
      />
    );
  }

  return (
    <section className="flex bg-black py-[60px] sm:py-[120px] gap-[40px] flex-col items-center">
      <section className="max-w-container px-6 grid grid-cols-1 w-full sm:grid-cols-2 gap-[52px] lg:grid-cols-3 mx-auto">
        {filteredAuctions.slice(0, 6).map((item) => (
          <AuctionItem {...item} key={item._id} />
        ))}
      </section>
      {filteredAuctions.length > 6 && (
        <Link
          href={Routes.AuctionItems}
          className={buttonVariants({
            className: "text-white rounded-[2px] font-medium",
            variant: "outline",
          })}
        >
          <MoveUpRight size={16} />
          <span className="ml-2">View more</span>
        </Link>
      )}
    </section>
  );
};
