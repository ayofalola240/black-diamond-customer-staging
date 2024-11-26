"use client";

import {
  Empty,
  Error,
  Loading,
  PayButton,
  PlaceABid,
} from "@/components/shared";
import { Button, buttonVariants } from "@/components/ui/button";
import { useGetNotifications, useTitle } from "@/hooks";
import { axiosClient } from "@/lib/api";
import { cacheTags, formatError, Routes } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Check, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { toast } from "sonner";

export default function Page() {
  const { data, isPending, error, countOfNewNotification } =
    useGetNotifications();
  useTitle(`Notifications (${countOfNewNotification})`);
  const queryClient = useQueryClient();
  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: (notificationId: string) => {
      return axiosClient.patch(`/notifications/${notificationId}/read`);
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: () => {
      toast.success("Marked as read");
      queryClient.invalidateQueries({ queryKey: [cacheTags.notifications] });
    },
  });

  if (isPending) return <Loading />;

  if (error)
    return <Error title="Something went wrong" desc={formatError(error)} />;

  return (
    <section className="w-full text-white max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-6 ">
      <header className="pb-[10px] sm:pb-[20px] border-b border-[#EEEEEE]">
        <h2 className="section-header">
          Your Notification{countOfNewNotification > 1 && "s"} (
          {countOfNewNotification})
        </h2>
      </header>
      {data.length == 0 ? (
        <Empty
          className="py-0"
          iconUrl="/svgs/notification.svg"
          title="You have no Notification"
          description="You have no notification just yet. All news, information and updates would appear here when you do"
        />
      ) : (
        <section className="flex divide-y divide-y-input flex-col">
          {data.map((item, index) => {
            return (
              <article key={index} className="space-y-2 py-6">
                <header className="flex items-center flex-wrap flex-row gap-2">
                  {item.status == "new" && (
                    <div className="bg-primary rounded-[6px] py-[2px] text-white px-[6px]">
                      New
                    </div>
                  )}

                  <h2 className="text-lg">{item.title}</h2>
                  <p className="text-[#999999] text-sm">
                    {format(new Date(item.timestamp), "MMM do, yyyy h:mmaaa")}
                  </p>
                </header>
                <p>{item.message}</p>
                <footer className="flex gap-[10px] flex-col sm:flex-row">
                  {(item.type == "new_listing" ||
                    item.type == "watch_list") && (
                    <Link
                      href={Routes.AuctionItems}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      <EllipsisVertical size={16} />
                      View details
                    </Link>
                    // <PlaceABid auction={item.auctionId} />
                  )}

                  {/* {(item.type == "payment_reminder" ||
                    item.type == "auction_ended") && (
                    <PayButton
                      size="sm"
                      amount={item.auctionId.currentBidAmount}
                      auctionIds={[item.auctionId._id]}
                    >
                      <Check size={16} />
                      <span>Make Payment</span>
                    </PayButton>
                  )} */}

                  {/* <Link
                    href={`/${item.auctionId.slug}/activities?auctionId=${item.auctionId._id}&title=${item.auctionId.title}`}
                    className="flex flex-row w-full justify-center sm:justify-start  text-lg font-medium items-center"
                  >
                    <IoIosArrowRoundForward
                      size={24}
                      className="-rotate-45 flex"
                    />
                    <span>View bidding activities</span>
                  </Link> */}

                  {item.status == "new" && (
                    <Button
                      disabled={isPendingMutation}
                      onClick={() => mutate(item._id)}
                      size="sm"
                    >
                      Mark as Read
                    </Button>
                  )}
                </footer>
              </article>
            );
          })}
        </section>
      )}
    </section>
  );
}
