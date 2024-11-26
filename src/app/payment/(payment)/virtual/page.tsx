"use client";

import { usePayment } from "@/store/payment";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/forms";
import { FaCopy } from "react-icons/fa";
import { useCountDown, useTitle } from "@/hooks";
import { cn, formatError, Routes } from "@/lib/utils";
import { toast } from "sonner";
import { HTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useRouter } from "nextjs-toploader/app";
import { HeaderComponent } from "@/components/payment";
import { axiosClient } from "@/lib/api";

export default function Page() {
  useTitle("Virtual Payment");
  const router = useRouter();
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);
  const paymentDetails = usePayment((state) => state.paymentDetails);

  const form = useForm({
    defaultValues: {
      amount: `₦${paymentDetails.paymentDetails.payment?.totalAmount.toLocaleString()}`,
      bankName: `${paymentDetails.paymentDetails.virtualAccount?.bankName}`,
      accountNumber: `${paymentDetails.paymentDetails.virtualAccount?.accountNumber}`,
      accountName: `${paymentDetails.paymentDetails.virtualAccount?.accountName}`,
    },
  });
  const { isClosed, time } = useCountDown({
    closingDate: new Date(
      paymentDetails?.paymentDetails?.virtualAccount!?.expiresAt! || new Date()
    ),
  });

  async function confirmPayment() {
    try {
      setIsConfirmingPayment(true);
      const { data } = await axiosClient.get(
        `/payments/payment-status/${paymentDetails.paymentDetails.payment.transactionReference}`
      );
      if (!data.status) return toast("Payment has not been confirmed yet");
      router.replace(Routes.PaymentSuccess);
    } catch (error) {
      toast.error(formatError(error));
    } finally {
      setIsConfirmingPayment(false);
    }
  }

  async function copyToClipBoard(text: string) {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
    } else {
      document.execCommand("copy", true, text);
    }
    toast.success("Copied to clipboard!");
  }

  return (
    <div className='py-[40px] flex flex-col gap-[40px]'>
      <HeaderComponent
        header='Make a payment into your account.'
        desc='Search for Sparkle or Sparkle MFB or Sparkle Microfinance Bank on your Bank app. Use this account for this payment only.'
      />
      <Form {...form}>
        <form className='space-y-4 flex-grow'>
          <FormInput
            isGrey
            name='amount'
            readOnly
            label='Payment Amount'
            inputRightElement={
              <CopyButton
                onClick={() => copyToClipBoard(form.getValues("amount"))}
              />
            }
          />
          <FormInput
            isGrey
            name='bankName'
            readOnly
            label='Bank Name'
            inputRightElement={
              <CopyButton
                onClick={() => copyToClipBoard(form.getValues("bankName"))}
              />
            }
          />
          <FormInput
            isGrey
            name='accountNumber'
            label='Account Number'
            readOnly
            inputRightElement={
              <CopyButton
                onClick={() => copyToClipBoard(form.getValues("accountNumber"))}
              />
            }
          />
          <FormInput
            isGrey
            name='accountName'
            readOnly
            label='Account Name'
            inputRightElement={
              <CopyButton
                onClick={() => copyToClipBoard(form.getValues("accountName"))}
              />
            }
          />
          <div
            className={cn(
              "h-[60px] rounded-[8px] flex flex-row justify-between items-center w-full bg-[#EDF8EB] px-4",
              isClosed && "bg-red-300"
            )}
          >
            <p
              className={cn(
                "text-[#46B839] font-bold",
                isClosed && "text-red-500"
              )}
            >
              {isClosed ? "Expired" : "Expires in"}
            </p>
            <p
              className={cn(
                "text-[#46B839] font-bold",
                isClosed && "text-red-500"
              )}
            >
              {time}
            </p>
          </div>
        </form>
      </Form>
      <div className='flex flex-col pt-[40px] gap-[20px] mt-auto'>
        <Button
          disabled={isConfirmingPayment}
          onClick={confirmPayment}
          className='bg-[#97D700] gap-2 font-satoshi font-semibold text-base'
        >
          <span>I have sent the money</span>
          <IoIosArrowDroprightCircle className='mt-[2px]' color='white' />
        </Button>
        <Button
          onClick={() => router.back()}
          className='border-[#97D700] text-[#97D700] font-satoshi font-semibold text-base'
          variant='outline'
        >
          <span>Cancel this transaction</span>
          <IoIosArrowDroprightCircle className='mt-[2px]' color='#97D700' />
        </Button>
      </div>
    </div>
  );
}

const CopyButton: React.FC<HTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button {...props} type='button'>
      <FaCopy color='#A1A3A7' />
    </button>
  );
};
