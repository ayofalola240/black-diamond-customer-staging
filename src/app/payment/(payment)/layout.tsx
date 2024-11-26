"use client";

import { cn, Routes } from "@/lib/utils";
import { usePayment } from "@/store/payment";
import Image from "next/image";
import { FaShield } from "react-icons/fa6";
import NotFound from "../../not-found";
import { JoinSparkle } from "@/components/payment";
import Link from "next/link";

export default function PaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const paymentDetails = usePayment((state) => state.paymentDetails);

  if (!paymentDetails.paymentDetails?.payment) {
    return <NotFound />;
  }

  return (
    <div
      className={cn(
        "bg-[#636669BF] payment  py-[20px]  w-full h-[100dvh] overflow-hidden"
      )}
    >
      <section className="w-full max-w-[1600px]  h-full grid grid-cols-1 lg:grid-cols-2 rounded-[20px] overflow-y-auto lg:overflow-hidden bg-white mx-auto">
        <div className="bg-[#f4f4f4] px-4 lg:overflow-y-auto py-10 md:py-[60px]">
          <div className="flex flex-col max-w-[560px] mx-auto gap-[48px] items-center">
            <Image
              alt="Sparkle Logo"
              width={231}
              height={64}
              src="/payment/sparkle-logo.svg"
            />
            <div className="flex flex-col text-[#14233B] items-center">
              <p className="">Payment amount</p>
              <p className="font-semibold  text-lg sm:text-2xl">
                ₦
                {paymentDetails.paymentDetails.payment.totalAmount.toLocaleString()}
              </p>
              <p className="">to</p>
              <div className="w-16 h-16 font-bold text-[#46B839] text-xl grid place-items-center rounded-[8px] bg-[#46B839]/10">
                {paymentDetails.paymentDetails.virtualAccount.accountName
                  .split(" ")[0]
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <p className="font-semibold  text-lg sm:text-2xl">
                Black Diamond Foundation
              </p>
              <p className="">from</p>
              <div className="font-semibold gap-1 flex flex-row items-center  text-lg sm:text-2xl">
                <p className="">Auction Website</p>
                <Link href={Routes.Carts} className="text-[#5C8300] ">
                  View Cart
                </Link>
              </div>
            </div>
            <Image
              alt="Banner"
              height={188}
              width={560}
              src={"/payment/banner.png"}
            />
            <JoinSparkle />
          </div>
        </div>
        <div className="lg:overflow-y-auto  pt-10 md:pt-[60px]">
          <div className="bg-white h-full flex flex-col  w-full  max-w-[560px] mx-auto px-4   justify-between ">
            <p className="self-start text-[32px] lg:font-[48px] font-semibold">
              Payment details
            </p>
            <div className="flex-grow">{children}</div>
            <p className="flex self-center flex-row items-center gap-2 font-semibold pb-[40px] text-#121312] text-[12px]">
              <FaShield />
              <span>
                Powered & Secured by NIBSS and Sparkle Microfinance Bank
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
