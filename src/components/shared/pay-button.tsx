"use client";
import { ReactNode, useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InfoImage } from "./info-image";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "@/lib/api";
import { toast } from "sonner";
import { formatError, Routes } from "@/lib/utils";
import { TInitiatePayment } from "@/types";
import { usePayment } from "@/store/payment";
import { useRouter } from "nextjs-toploader/app";

interface IProps extends ButtonProps {
  children: ReactNode;

  auctionIds: string[];
  amount: number;
}

const FormSchema = z.object({
  type: z.enum(["SPARKLE", "VIRTUAL_ACCOUNT"], {
    required_error: "You need to select a payment type.",
  }),
});

type IForm = z.infer<typeof FormSchema>;

const radioContent = [
  // {
  //   value: "SPARKLE",
  //   label: "Pay with Sparkle",
  //   description:
  //     "Initiate a fast & secure payment request (Sparkle Account Required)",
  // },
  {
    value: "VIRTUAL_ACCOUNT",
    label: "Pay with Virtual Account",
    description:
      "Make payment to the provided secure and personalised Sparkle account.",
  },
];

export const PayButton = ({
  children,
  amount,
  auctionIds,
  ...rest
}: IProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setPayment = usePayment((state) => state.setPayment);

  const form = useForm<IForm>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IForm) => {
      return axiosClient.post<TInitiatePayment>("/payments/payment-method", {
        method: data.type,
        auctionIds,
      });
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: (data, variable) => {
      setPayment(data.data);
      router.push(
        variable.type == "VIRTUAL_ACCOUNT"
          ? Routes.VirtualPayment
          : Routes.SparklePayment
      );
    },
  });

  function onSubmit(data: IForm) {
    mutate(data);
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsModalOpen(true)} {...rest}>
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[632px] bg-[#111] text-white border-0 space-y-[32px] px-4 sm:px-8">
          <header className="flex max-w-[468px] mx-auto flex-col text-center items-center justify-center gap-4">
            <div className="space-y-1">
              <p>Payment Amount</p>
              <h2 className="font-bold text-[36px]">
                {" "}
                ₦{amount.toLocaleString()}
              </h2>
            </div>
            <p className="text-2xl font-medium">
              You’re about to make payment for your item won from the Auction
            </p>
            <p>How do you want to proceed?</p>
          </header>
          <Form {...form}>
            <form
              id="payment-submit"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {radioContent.map((item) => (
                          <FormItem
                            key={item.label}
                            className="flex items-center  w-full space-x-3 space-y-0"
                          >
                            <FormLabel
                              htmlFor={item.value}
                              className="flex items-center space-x-3  border border-[#999999] w-full rounded-lg px-4 py-[10px] cursor-pointer hover:bg-secondary/90 hover:text-black"
                            >
                              <div className="flex-grow">
                                <p className="font-medium text-sm">
                                  {item.label}
                                </p>
                                <p className="text-[12px] text-[#666]">
                                  {item.description}
                                </p>
                              </div>
                              <FormControl>
                                <RadioGroupItem
                                  value={item.value}
                                  id={item.value}
                                  className="min-h-5 min-w-5"
                                />
                              </FormControl>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <footer className="max-w-[484px] space-y-[32px] mx-auto">
            <div className=" flex flex-row gap-2 ">
              <Button
                className="w-full space-x-2 rounded-[4px]"
                onClick={() => setIsModalOpen(false)}
                variant="outline"
              >
                <X size={20} />
                <span>Cancel</span>
              </Button>
              <Button
                disabled={isPending}
                type="submit"
                form="payment-submit"
                className="w-full space-x-2"
              >
                <span>Continue</span>
                <InfoImage width={16} height={16} url="/svgs/arrow-svg.svg" />
              </Button>
            </div>
            <p className="text-center text-[12px]">
              All Payments would be held in a secure Escrow account and funds
              would be released to seller when item is received and transaction
              is complete.
            </p>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  );
};
