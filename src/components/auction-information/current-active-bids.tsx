"use client";

import { AuctionItem, Empty, Loading } from "../shared";
import { useGetActiveBids } from "@/hooks";

export const CurrentActiveBid = async () => {
  const { data, isLoading } = useGetActiveBids({ limit: 4, page: 1 });

  return (
    <article className='gap-4 max-w-[794px] flex-col flex'>
      <h2>Current Active Bids</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.pagination.totalItems == 0 ? (
            <Empty
              className='py-0 items-start max-w-full'
              description='Place bids to see your active bids here'
            />
          ) : (
            <section className='grid gap-[10px] grid-cols-1 sm:grid-cols-2'>
              {data?.bids.map((item) => {
                return <AuctionItem {...item.auction} key={item._id} />;
              })}
            </section>
          )}
        </>
      )}
    </article>
  );
};
