"use client";

import { cn, Routes } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { memo, useMemo } from "react";
import {
  useAddWishList,
  useCountDown,
  useDeleteWatchList,
  useGetUser,
  useGetWishLists,
} from "@/hooks";
import Link from "next/link";
import { PlaceABid } from "./place-a-bid";
import { TInventory } from "@/types";
import { FiHeart } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "nextjs-toploader/app";

export const AuctionItem = memo((props: TInventory) => {
  const {
    endTime,
    status,
    images,
    slug,
    _id,
    title,
    currentBidAmount,
    startingBidAmount,
  } = props;
  const router = useRouter();
  const { time, isClosed } = useCountDown({
    status,
    closingDate: endTime,
  });
  const { isPending, mutate } = useAddWishList();
  const {
    isPending: deletingItemFromWatchList,
    mutate: deleteItemFromWatchList,
  } = useDeleteWatchList();
  const { data: watchLists, isPending: gettingWatchLists } = useGetWishLists();
  const { data } = useGetUser();

  const itemInWatchList = useMemo(() => {
    if (watchLists?.auctionIds) {
      const isItemInWatchList = watchLists.auctionIds.find(
        (item) => item._id == _id
      );
      return isItemInWatchList;
    }
    return false;
  }, [watchLists, _id]);

  return (
    <article
      className={cn(
        "w-full border px-4 bg-white text-black rounded-[8px] min-w-full sm:w-[392px] sm:max-w-[392px]"
      )}
    >
      <section className="pt-4 pb-[12px] relative w-full">
        <div className="h-[220px] relative w-full">
          <Image
            className="object-contain"
            fill
            alt={`${title} Image`}
            src={images?.[0]?.image_url}
          />
        </div>
        <div className="flex top-8 absolute w-full flex-row items-center justify-between">
          <div
            className={cn(
              "bg-input rounded-[6px] py-[2px] px-[6px] text-[12px] leading-[20px] -tracking-[0.3px]",
              isClosed && "bg-[#2D5BFF] text-white",
              status == "cancelled" && "bg-[#FF0000] text-white",
              status == "pending" && "bg-green-500",
              status == "ongoing" && "bg-orange-500 text-white"
            )}
          >
            {status == "cancelled"
              ? "Cancelled"
              : status == "pending"
              ? "Pending"
              : status == "ongoing"
              ? time
              : "Closed"}
            {/* {status == "cancelled" ? "Cancelled" : isClosed ? "Closed" : time} */}
          </div>

          <div className="ml-auto">
            <button
              disabled={isPending}
              onClick={() => {
                if (!data) return router.push(Routes.Login);
                if (itemInWatchList) deleteItemFromWatchList(_id);
                else mutate(_id);
              }}
              className="border border-black w-8 h-8 flex items-center justify-center self-end rounded-[4px]"
            >
              {isPending || gettingWatchLists || deletingItemFromWatchList ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FiHeart fill={itemInWatchList ? "black" : "white"} size={16} />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <p className="text-[#666666] text-ellipsis truncate">{title}</p>
          <p className="text-[12px] leading-[20px]">
            Starting Bid: ₦{startingBidAmount?.toLocaleString()}
          </p>
        </div>
      </section>
      <footer className="flex flex-row py-3 border-t border-input justify-between">
        {status !== "pending" && (
          <div>
            <p className="text-[12px] leading-[20px]">
              {isClosed ? "Closed Bid at" : "Current Bid"}
            </p>
            <p className="font-medium text-base">
              ₦{currentBidAmount?.toLocaleString()}
            </p>
          </div>
        )}

        <div className="flex flex-row gap-2 items-center">
          <Link
            className={buttonVariants({ size: "sm", variant: "outline" })}
            href={`/${slug}`}
          >
            <EllipsisVertical size={16} />
            <span>View</span>
          </Link>

          {!isClosed && <PlaceABid auction={props} />}
        </div>
      </footer>
    </article>
  );
});

AuctionItem.displayName = "Auction Item";
