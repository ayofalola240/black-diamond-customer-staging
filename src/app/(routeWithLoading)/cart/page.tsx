"use client";
import { Cart } from "@/components/cart";
import { Empty, Error, Loading } from "@/components/shared";
import { useCart } from "@/hooks/use-carts";

export default function Page() {
  const { data, isLoading, error } = useCart();

  if (error) return <Error title="Something went wrong" />;
  if (isLoading || !data?.data) return <Loading />;

  return (
    <section className=" w-full  max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-10  ">
      <header className="pb-[10px] sm:pb-[20px] border-b border-[#EEEEEE]">
        <h2>Your Cart ({data.data.totalItems})</h2>
      </header>
      {data.data.totalItems == 0 ? (
        <Empty
          className="py-0"
          iconUrl="/svgs/cart.svg"
          title="You have no item in your Cart"
          description="Your Cart is currently empty. Any items you win from an auction will appear here for you to check out and complete your payment. Start bidding to win an auction!"
        />
      ) : (
        <Cart data={data.data} />
      )}
    </section>
  );
}
