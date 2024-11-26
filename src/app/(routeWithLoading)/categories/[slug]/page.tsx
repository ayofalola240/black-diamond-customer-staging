import { getAuctionByCategory } from "@/actions/auction";
import { AuctionItem, Empty, Pagination } from "@/components/shared";
import { pageLimit } from "@/lib/utils";

import { FilterCategory } from "@/components/category/filter-category";

interface IProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const revalidate = 0;

export default async function Page({ params: { slug }, searchParams }: IProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || pageLimit;
  const category = decodeURIComponent(slug);
  console.log(category);
  const auctions = await getAuctionByCategory({
    limit,
    page,
    category,
  });

  return (
    <section className=" w-full  max-w-container mx-auto flex flex-col py-[30px] px-6 gap-10  ">
      <header className="pb-[20px]  flex flex-col sm:flex-row justify-between  gap-2 border-b border-[#EEEEEE]">
        <h2>{category}</h2>
        <div className="flex flex-row gap-2 items-center whitespace-nowrap">
          <p className="text-white">Filter By Category:</p>
          <FilterCategory category={category} />
        </div>
      </header>
      {auctions.pagination.totalItems == 0 ? (
        <Empty
          className="py-10"
          description="No items yet for the selected category"
        />
      ) : (
        <section className="grid gap-[10px] grid-cols-1 sm:grid-cols-3">
          {auctions.auctions.map((item) => {
            return <AuctionItem {...item} key={item._id} />;
          })}
        </section>
      )}

      <Pagination
        isServerSide
        totalCount={auctions.pagination.totalItems}
        pageSize={pageLimit}
        currentPage={page}
      />
    </section>
  );
}

// export async function generateMetadata({ params }: IProps) {
//   const auction = await getAuction(params.uid);
//   return {
//     title: "error" in auction ? auction.error : auction.title,
//   } as Metadata;
// }
