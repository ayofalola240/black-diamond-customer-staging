"use client";
import { useCart } from "@/hooks/use-carts";
import { Empty, Error, Loading, PayButton } from "../shared";
import { PaymentItem } from "./payment-item";
import { useMemo } from "react";

export const UpcomingPayment = () => {
  const { data, isLoading, error } = useCart();

  const totalAmount = useMemo(() => {
    if (!data) return 0;
    return data.data.items.reduce(
      (acc, item) => acc + Number(item.auction.currentBidAmount),
      0
    );
  }, [data]);

  if (error) return <Error title="Something went wrong" />;
  return (
    <section className="flex flex-col gap-4">
      <header>
        <h2>Upcoming Payment</h2>
        <p>Outstanding payments from items won at the auction</p>
      </header>
      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          {data?.data.totalItems == 0 ? (
            <Empty
              className="py-0 items-start max-w-full"
              title="You currently have not won any item"
            />
          ) : (
            <section className="divide-y divide-y-input">
              {data.data.items.map((item, index) => {
                const auction = item.auction;
                return (
                  <PaymentItem
                    auctionId={item.auction._id}
                    key={item.auction._id}
                    slug={item.auction.slug}
                    amount={item.auction.currentBidAmount}
                    name={item.auction.title}
                    productImage={item.auction.images[0]?.image_url}
                  />
                );
              })}

              <hr />
              <PayButton
                amount={totalAmount || 0}
                auctionIds={
                  data.data.items.map((item) => item.auction._id) || []
                }
                className="mt-4"
              >
                Pay ₦{totalAmount?.toLocaleString()} for all items
              </PayButton>
            </section>
          )}
        </>
      )}
    </section>
  );
};
