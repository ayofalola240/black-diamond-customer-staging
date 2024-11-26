"use client";
import { useGetBuyersTransactions } from "@/hooks";
import { PaymentItem } from "./payment-item";
import { useState } from "react";
import { Empty, Loading, Pagination } from "../shared";

export const PastPayment = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBuyersTransactions({
    page,
    limit: 4,
    item: "received",
  });

  return (
    <section className="flex flex-col gap-4">
      <header>
        <h2>Past Payment</h2>
        <p>View past payment and won auction items</p>
      </header>
      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          {data?.pagination.totalItems == 0 ? (
            <Empty
              className="py-0 items-start max-w-full "
              description="You currently have not won any items"
            />
          ) : (
            <>
              <section className="divide-y px-4 divide-y-input">
                {data.data.map((item) => {
                  return (
                    <PaymentItem
                      auctionId={item.auction._id}
                      key={item.auction._id}
                      slug={item.auction.slug}
                      receiptUrl={item.payment.receiptUrl}
                      paidWith={
                        item.payment.paymentMethod == "sparkle"
                          ? "Sparkle"
                          : "Virtual Account"
                      }
                      paymentDate={
                        item.payment.createdAt
                          ? new Date(item.payment.createdAt)
                          : new Date()
                      }
                      amount={item.auction.currentBidAmount}
                      name={item.auction.title}
                      productImage={item.auction.images[0]?.image_url}
                    />
                  );
                })}
              </section>
              <Pagination
                currentPage={page}
                totalCount={data?.pagination.totalItems}
                pageSize={4}
                setValue={setPage}
              />
            </>
          )}
        </>
      )}
    </section>
  );
};
