"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ComponentProps, useState } from "react";
import { Check } from "lucide-react";
import { cacheTags, cn, formatError, Routes } from "@/lib/utils";
import { IoCloseCircle } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { FormInput } from "../forms";
import { Modal } from "./modal";
import { TInventory } from "@/types";
import { useGetUser } from "@/hooks";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/api";
import { toast } from "sonner";

interface IProps extends ComponentProps<typeof Button> {
  auction: TInventory;
}

export const PlaceABid = ({ className, auction, ...rest }: IProps) => {
  const queryClient = useQueryClient();
  const { data } = useGetUser();
  const router = useRouter();
  const { startingBidAmount, title, _id, slug, images, currentBidAmount } =
    auction;
  const [showingSuccess, setShowingSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    amount: z
      .string()
      .min(1, { message: "Amount is required" })
      .refine((value) => Number(value) > Number(currentBidAmount), {
        message: `Amount must be greater than ${currentBidAmount}`,
      }),
    fee: z.string().min(1),
  });

  type TType = z.infer<typeof formSchema>;

  const { mutate, isPending } = useMutation({
    mutationFn: (args: TType) => {
      return axiosClient.post("/bids/place-bid", {
        auctionId: _id,
        amount: args.amount,
      });
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheTags.activeBids],
      });
      setIsOpen(false);
      setShowingSuccess(true);
      setTimeout(() => {
        router.refresh();
      }, 3000);
    },
  });

  const form = useForm<TType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      fee: "5000",
    },
  });

  async function onSubmit(values: TType) {
    if (!data?._id) {
      setIsOpen(false);
      router.push(Routes.Login);
      return;
    }
    mutate(values);
  }

  return (
    <>
      <Modal
        footerButtonLabel="Continue Bidding"
        isOpen={showingSuccess}
        setIsOpen={setShowingSuccess}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className={cn("space-x-2", className)}
            size="sm"
            {...rest}
          >
            <Check size={16} />
            <span>Place a bid</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="pt-[20px] overflow-y-auto bg-[#111] space-y-4 pb-[40px]  sm:min-w-[729px]">
          <DialogHeader>
            <DialogTitle>Place a bid</DialogTitle>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              className="bg-white hover:bg-white/80"
              size="icon"
            >
              <IoCloseCircle size={30} />
            </Button>
          </DialogHeader>
          <section className="flex flex-col items-center px-6 sm:flex-row">
            <div className="relative w-full h-[240px] sm:min-w-[240px]">
              <Image
                className="object-contain"
                src={images?.[0]?.image_url}
                alt={`${title} Image`}
                fill
              />
            </div>
            <div className="flex flex-col w-full gap-4 mt-4 sm:mt-0 sm:ml-4">
              <h2 className="text-xl sm:text-2xl font-medium l">{title}</h2>
              <p className="text-[#666666]">
                Current Bid: ₦{currentBidAmount.toLocaleString()}
              </p>
              <p className="text-[#999999] text-[12px]">
                Starting Bid: ₦{startingBidAmount.toLocaleString()}
              </p>
              <Link
                className="font-medium text-white text-base"
                href={`/${slug}`}
              >
                View item details
              </Link>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-[12px]"
                >
                  <FormInput<TType>
                    placeholder={"5,000"}
                    label="How much do you want to bid?"
                    type="number"
                    name="amount"
                  />
                  <FormInput<TType>
                    disabled
                    aria-disabled
                    placeholder="How much do you want to bid?"
                    label="Bidding Fee"
                    type="number"
                    name="fee"
                  />
                  <Button disabled={isPending} className="w-full">
                    Confirm
                  </Button>
                </form>
              </Form>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};
