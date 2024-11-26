"use client";

import { useCart } from "@/hooks/use-carts";
import { AuctionItem, Empty, Loading } from "../shared";

export const AuctionWon = async () => {
  const { data, isLoading } = useCart();

  return (
    <article className="gap-4 max-w-[794px] flex-col flex">
      <h2>Auction Won</h2>
      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          {data?.data.totalItems == 0 ? (
            <Empty
              className="py-0 items-start max-w-full"
              title="You have not win any auction yet"
              description="Start bidding to win an auction!"
            />
          ) : (
            <section className="grid gap-[10px] grid-cols-1 sm:grid-cols-2">
              {data.data.items.map((item) => {
                return <AuctionItem {...item.auction} key={item.auction._id} />;
              })}
            </section>
          )}
        </>
      )}
    </article>
  );
};
