"use client";

import { AuctionItem, Empty, Loading } from "@/components/shared";
import { useGetWishLists, useTitle } from "@/hooks";

export default function Page() {
  useTitle("Watchlist");
  const { isLoading, data } = useGetWishLists();
  const watchListCount = data?.auctionIds.length || 0;

  return (
    <section className=" w-full  max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-10  ">
      <header className="pb-[10px] sm:pb-[20px] border-b border-[#EEEEEE]">
        <h2>Your Watchlist ({watchListCount})</h2>
      </header>
      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          {data.auctionIds.length == 0 ? (
            <Empty
              className="py-10 "
              description="You don't have any items on your watchlist"
              title="Your Watchlist is empty"
            />
          ) : (
            <>
              <section className="grid gap-[10px] grid-cols-1 sm:grid-cols-3">
                {data.auctionIds.map((item) => {
                  return <AuctionItem {...item} key={item._id} />;
                })}
              </section>
            </>
          )}
        </>
      )}
    </section>
  );
}
