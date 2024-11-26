"use client";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { PayButton } from "../shared";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/api";
import { cacheTags, formatError } from "@/lib/utils";
import { toast } from "sonner";
import { useCountDown } from "@/hooks";

interface IProps {
  productImage: string;
  name: string;
  amount: number;
  slug?: string;
  transactionId?: string;
  auctionId: string;
  receiptUrl?: string;
  expiresAt?: Date; // if there is expiresAt, then show a countdown on the item

  /**
   * Indicates if the payment is upcoming or current
   * basically to display if pay or I have received on the button
   */
  upcoming?: boolean;
  /**
   * Date when the payment was made by the buyer
   */
  paymentDate?: Date;

  paidWith?: string;
}

export const PaymentItem = ({
  productImage = "/temp/iphone.png",
  name,
  upcoming = true,
  transactionId,
  amount,
  expiresAt,
  receiptUrl,
  auctionId,
  slug,
  paymentDate,
  paidWith,
}: IProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axiosClient.patch(
        `/payments/buyer-transaction/${transactionId}/item-received`
      ),
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: async () => {
      toast.success("Item received");
      await queryClient.invalidateQueries({
        queryKey: [cacheTags.buyersTransactions],
      });
      await queryClient.invalidateQueries({
        queryKey: [cacheTags.auctionWon],
      });
    },
  });
  const { isClosed, time } = useCountDown({
    enabled: Boolean(expiresAt),
    closingDate: expiresAt,
    status: expiresAt
      ? new Date().getTime() > new Date(expiresAt).getTime()
        ? "completed"
        : "ongoing"
      : "cancelled",
  });

  return (
    <article className="flex py-4 gap-4 flex-col sm:flex-row items-start sm:items-center justify-between w-full">
      <div className="flex-col w-full items-start sm:items-center  sm:flex-row flex gap-4">
        <div className="relative h-[100px] rounded-[8px] border p-1 w-[100px]">
          <Image
            className="object-contain"
            fill
            src={productImage}
            alt="test"
          />
        </div>
        <div className="flex-col w-full flex gap-4">
          <div className="flex flex-col w-full justify-between  items-start sm:items-center gap-2 sm:flex-row">
            <div className="flex gap-1 flex-col">
              <p className="font-medium">{name}</p>
              <p className="text-[#666666] ">
                Amount paid: ₦{amount.toLocaleString()}{" "}
                {paymentDate &&
                  `• Paid with ${paidWith} ${format(
                    new Date(paymentDate),
                    "MMM do, yyyy hh:mm a"
                  )}`}{" "}
              </p>
              {expiresAt && (
                <p className="text-[#666666]">
                  {isClosed ? "Expired" : `Expires in: ${time}`}{" "}
                </p>
              )}
            </div>
            {!paymentDate && (
              <>
                {upcoming ? (
                  <PayButton
                    disabled={isClosed && Boolean(expiresAt)}
                    auctionIds={[auctionId]}
                    amount={amount}
                    size="sm"
                  >
                    Pay ₦{amount.toLocaleString()} only
                  </PayButton>
                ) : (
                  <Button
                    disabled={isPending}
                    onClick={() => mutate()}
                    size="sm"
                  >
                    I have received my item
                  </Button>
                )}
              </>
            )}
          </div>
          {/* If the payment has been made, there's no reason showing this button again */}
          {paymentDate && (
            <div className="flex flex-row gap-1">
              <Link
                href={`/${slug}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                })}
              >
                <EllipsisVertical size={16} />
                View details
              </Link>
              <Button
                onClick={() => {
                  window.open(receiptUrl, "_blank");
                }}
                variant="outline"
                size="sm"
              >
                <EllipsisVertical size={16} />
                View Receipt
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
