import { cn, Routes } from "@/lib/utils";
import { PaymentItem } from "../payment-information";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { PayButton } from "../shared";
import { TCart } from "@/hooks/use-carts";

const containerClassName = "border rounded-[8px]  border-input p-6";

interface IProps {
  data: TCart;
}

export const Cart = ({ data }: IProps) => {
  const totalAmount = data.items.reduce(
    (prev, curr) => prev + Number(curr.auction.currentBidAmount),
    0
  );

  return (
    <section className="grid gap-8 text-white sm:grid-cols-3">
      <article className={cn("sm:col-span-2", containerClassName)}>
        <h3 className="font-medium text-2xl">Items won from Auction</h3>
        <div className="divide-y divide-y-input">
          {data.items.map((item) => {
            const auction = item.auction;
            return (
              <PaymentItem
                auctionId={auction._id}
                key={auction._id}
                amount={auction.currentBidAmount}
                name={auction.title}
                productImage={auction.images[0]?.image_url}
                expiresAt={item.expiresAt}
              />
            );
          })}
        </div>
      </article>
      <article
        className={cn(containerClassName, "divide-y divide-y-input py-0")}
      >
        <h3 className="font-medium py-6 text-2xl">Payment Review</h3>
        <div className="flex flex-row py-6 items-center justify-between">
          <p className="text-[#666]">Subtotal:</p>
          <p className="font-medium text-xl">
            ₦ {totalAmount?.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-row py-6 items-center justify-between">
          <p className="text-[#666]">Total:</p>
          <p className="font-medium text-xl">
            ₦ {totalAmount?.toLocaleString()}
          </p>
        </div>
        <div className="space-y-2 pb-6">
          <PayButton
            amount={totalAmount || 0}
            auctionIds={data.items.map((item) => item.auction._id) || []}
            className="w-full"
          >
            Pay ₦ {totalAmount?.toLocaleString()}
          </PayButton>
          <Link
            href={Routes.Home}
            className={buttonVariants({
              variant: "outline",
              className: "w-full",
            })}
          >
            Continue Shopping
          </Link>
        </div>
      </article>
    </section>
  );
};
