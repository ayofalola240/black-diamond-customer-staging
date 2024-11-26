"use client";
import { useState } from "react";
import { InfoComponent } from "./info-component";
import { PaymentItem } from "./payment-item";
import { useGetBuyersTransactions } from "@/hooks";
import { Empty, Loading } from "../shared";

export const CurrentPayment = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBuyersTransactions({
    page,
    limit: 4,
    item: "not_received",
  });

  return (
    <section className='flex flex-col gap-4'>
      <header>
        <h2>Current Payment</h2>
        <p>
          Payment made and still being held in Escrow until you have received
          your item
        </p>
      </header>

      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          {data?.pagination.totalItems == 0 ? (
            <Empty
              className='py-0 items-start max-w-full '
              description='You currently have no items held by escrow'
            />
          ) : (
            <>
              <InfoComponent
                title='Payment are secure with Sparkle Escrow!'
                content="Your payment is securely held with Sparkle Escrow and will not be released to the seller yet.  Please click 'I have received my item' once your item arrives to authorize the seller's payment."
              />
              <section className='divide-y divide-y-input'>
                {data.data.map((item) => {
                  return (
                    <PaymentItem
                      transactionId={item.transactionId}
                      upcoming={false}
                      auctionId={item.auction._id}
                      key={item.auction._id}
                      slug={item.auction.slug}
                      amount={item.auction.currentBidAmount}
                      name={item.auction.title}
                      productImage={item.auction.images[0]?.image_url}
                    />
                  );
                })}
              </section>
            </>
          )}
        </>
      )}
    </section>
  );
};
