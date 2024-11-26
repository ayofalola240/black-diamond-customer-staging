"use client";

import { cn, Routes } from "@/lib/utils";
import { usePayment } from "@/store/payment";
import Image from "next/image";
import NotFound from "../../not-found";
import { JoinSparkle } from "@/components/payment";
import { Button } from "@/components/ui/button";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useRouter } from "nextjs-toploader/app";
import { SuccessSvg } from "@/components/svgs";

export default function Page() {
  const paymentDetails = usePayment((state) => state.paymentDetails);
  const router = useRouter();
  const setPaymentDetails = usePayment((state) => state.setPayment);

  if (!paymentDetails.paymentDetails?.payment) {
    return <NotFound />;
  }

  return (
    <div
      className={cn(
        "bg-[#636669BF] payment py-[20px]  w-full h-[100dvh] overflow-hidden"
      )}
    >
      <section className='w-full max-w-[800px]  h-full  rounded-[20px] overflow-y-auto  mx-auto'>
        <div className='bg-[#f4f4f4] px-4 w-full  py-10 md:py-[60px]'>
          <div className='flex flex-col max-w-[560px] mx-auto w-full gap-[48px] items-center'>
            <Image
              alt='Sparkle Logo'
              width={231}
              height={64}
              src='/payment/sparkle-logo.svg'
            />
            <SuccessSvg color='#46B839' />

            <div className='flex flex-col text-[#14233B] items-center'>
              <p>Payment amount</p>
              <p className='font-semibold  text-lg sm:text-2xl'>
                ₦
                {paymentDetails.paymentDetails.payment.totalAmount.toLocaleString()}
              </p>
              <p>to</p>
              <div className='w-16 h-16 font-bold text-[#46B839] text-xl grid place-items-center rounded-[8px] bg-[#46B839]/10'>
                {paymentDetails.paymentDetails.virtualAccount.accountName
                  .split(" ")[0]
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <p className='font-semibold  text-lg sm:text-2xl'>
                Black Diamond Foundation
              </p>
              <p>was</p>
              <div className='font-semibold gap-1 flex flex-row items-center  text-lg sm:text-2xl'>
                <p>Successful</p>
              </div>
            </div>
            <p>
              Transaction Reference:{" "}
              {paymentDetails.paymentDetails.payment.transactionReference}
            </p>
            <div className='flex flex-col w-full gap-[20px]'>
              <Button className=' gap-2 font-satoshi font-semibold text-base'>
                <span>Download receipt</span>
                <IoIosArrowDroprightCircle className='mt-[2px]' color='white' />
              </Button>
              <Button
                onClick={() => {
                  router.replace(Routes.Home);
                  setPaymentDetails({} as any);
                }}
                className='border-[#97D700] text-[#97D700] font-satoshi font-semibold text-base'
                variant='outline'
              >
                <span>Close</span>
                <IoIosArrowDroprightCircle
                  className='mt-[2px]'
                  color='#97D700'
                />
              </Button>
            </div>
            <JoinSparkle />
          </div>
        </div>
      </section>
    </div>
  );
}
