import { getAuction } from "@/actions/auction";
import { Carousel, ItemDetails, Description } from "@/components/items";
import { Error } from "@/components/shared";
import { Metadata } from "next";

interface IProps {
  params: { uid: string };
}

export const revalidate = 0;

export default async function Page({ params: { uid } }: IProps) {
  const auction = await getAuction(uid);

  if ("error" in auction) {
    return (
      <div className="w-full text-center">
        <Error title={auction.error} />;
      </div>
    );
  }

  return (
    <section className="flex w-full flex-col">
      <section className="grid py-[40px] gap-8 w-full sm:py-[80px] max-w-container mx-auto px-6 grid-cols-1 lg:grid-cols-2">
        <Carousel images={auction.images} />
        <ItemDetails {...auction} />
      </section>
      <article className="bg-black border-t-[0.4px] border-white py-[40px] sm:py-[80px]">
        <div className="max-w-container text-white mx-auto px-6">
          <header className="pb-4 border-b border-[#EEEEEE]">
            <h2>Description</h2>
          </header>
          <Description description={auction.description} />
        </div>
      </article>
    </section>
  );
}

export async function generateMetadata({ params }: IProps) {
  const auction = await getAuction(params.uid);
  return {
    title: "error" in auction ? auction.error : auction.title,
  } as Metadata;
}
