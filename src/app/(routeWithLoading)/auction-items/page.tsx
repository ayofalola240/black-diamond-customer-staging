import { getAuctions } from "@/actions/auction";
import { AuctionItem, Empty, Pagination } from "@/components/shared";
import { pageLimit, Routes } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auction Items",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || pageLimit;
  const auctions = await getAuctions({ limit, page, status: "ongoing" });

  return (
    <section className=" w-full  max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-10  ">
      <header className="pb-[10px] sm:pb-[20px] border-b border-[#EEEEEE]">
        <h2>Auction Items</h2>
      </header>
      {auctions.pagination.totalItems == 0 ? (
        <Empty
          title="Auction To Begin Soon!"
          className="py-[50px]"
          description="The Black Diamond Foundation Auction would start momentarily"
          iconUrl="/svgs/black-logo.svg"
          linkText="Refresh"
          link={Routes.AuctionItems}
        />
      ) : (
        <>
          <section className="grid gap-[10px] grid-cols-1 sm:grid-cols-3">
            {auctions.auctions.map((item) => {
              return <AuctionItem {...item} key={item._id} />;
            })}
          </section>
          <Pagination
            isServerSide
            totalCount={auctions.pagination.totalItems}
            pageSize={pageLimit}
            currentPage={page}
          />
        </>
      )}
    </section>
  );
}
