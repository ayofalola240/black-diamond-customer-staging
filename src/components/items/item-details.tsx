"use client";

import {
  useAddWishList,
  useCountDown,
  useDeleteWatchList,
  useGetUser,
  useGetWishLists,
} from "@/hooks";
import { Button } from "@/components/ui/button";
import { LastBidders } from "./last-bidder-item";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { PlaceABid } from "../shared";
import { TInventory } from "@/types";
import { cn, Routes } from "@/lib/utils";
import { useMemo } from "react";
import { useRouter } from "nextjs-toploader/app";

export const ItemDetails = (props: TInventory) => {
  const {
    status,
    title,
    bids,
    _id,
    startingBidAmount,
    endTime,
    slug,
    currentBidAmount,
    escrowType,
  } = props;
  const { time, isClosed } = useCountDown({
    status,
    closingDate: endTime,
  });
  const router = useRouter();
  const { data } = useGetUser();
  const { isPending, mutate } = useAddWishList();
  const {
    isPending: deletingItemFromWatchList,
    mutate: deleteItemFromWatchList,
  } = useDeleteWatchList();
  const { data: watchLists, isPending: gettingWatchLists } = useGetWishLists();
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
    <article className="flex flex-col  text-white gap-4 sm:gap-8">
      <div className="border-[#999999] rounded py-[2px] px-[6px] capitalize w-fit text-[12px]  bg-primary">
        {escrowType} Auction
      </div>
      <header>
        <h1 className="text-2xl font-bold  sm:text-3xl">{title}</h1>
        <p className="text-[#999999] text-lg sm:text-xl">
          Starting Bid: ₦{startingBidAmount.toLocaleString()}
        </p>
      </header>
      <div>
        <p className="text-[#999999] text-lg sm:text-xl">Current Bid:</p>
        <p className="text-2xl font-bold sm:text-3xl">
          ₦{currentBidAmount.toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-[#999999] text-lg sm:text-xl">Bidding closes in</p>
        <p className="text-xl sm:text-2xl font-medium">
          {status == "pending" ? "Pending" : isClosed ? "Closed" : time}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        {!isClosed && (
          <PlaceABid
            auction={props}
            size="default"
            className="w-full = rounded-[4px] sm:w-auto"
          />
        )}
        <Button
          disabled={isPending || deletingItemFromWatchList}
          onClick={() => {
            if (!data) return router.push(Routes.Login);
            if (itemInWatchList) deleteItemFromWatchList(_id);
            else mutate(_id);
          }}
          variant="outline"
          className="flex w-full rounded-[4px] sm:w-auto flex-row items-center gap-1"
        >
          <FaRegHeart fill="white" />
          <span>
            {gettingWatchLists
              ? "Loading..."
              : itemInWatchList
              ? "Remove from my WatchList"
              : "Add to my WatchList"}
          </span>
        </Button>
      </div>
      <article className={cn("flex flex-col mt-4 sm:mt-0  items-start gap-4")}>
        <div
          className={cn(
            "flex flex-col w-full",
            bids.length == 0 ? "gap-0" : "gap-4"
          )}
        >
          <h3 className="text-xl font-medium">Last 3 Bidders</h3>
          {bids.length == 0 ? (
            <p className="text-[#999999] text-lg sm:text-xl">No Bidders yet</p>
          ) : (
            <ul className="flex w-full flex-col divide-y divide-[#EEEEEE]">
              {bids.slice(0, 3).map((item, index) => (
                <LastBidders
                  key={index}
                  index={index}
                  amount={item.amount}
                  name={item.bidder.firstName + " " + item.bidder.lastName}
                  bidDate={new Date(item.timestamp)}
                />
              ))}
            </ul>
          )}
        </div>

        {bids.length > 3 && (
          <Link
            href={`/${slug}/activities?auctionId=${_id}&title=${title}`}
            className="flex flex-row text-lg font-medium items-center"
          >
            <IoIosArrowRoundForward
              size={24}
              className="-rotate-45 hidden sm:flex"
            />
            <span>View bidding activities on this Auction</span>
          </Link>
        )}
      </article>
    </article>
  );
};
