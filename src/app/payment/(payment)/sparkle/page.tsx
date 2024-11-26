"use client";

import { useTitle } from "@/hooks";
import { HeaderComponent } from "@/components/payment";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormOTP } from "@/components/forms";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { Routes } from "@/lib/utils";

const schema = z.object({
  accountNumber: z.string().min(10).max(10),
  accountName: z.string().optional(),
  otp: z.string().optional(),
});

type TFormInput = z.infer<typeof schema>;

export default function Page() {
  useTitle("Sparkle Payment");
  const router = useRouter();
  const form = useForm<TFormInput>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const [isOtpSent, setIsOtpSent] = useState(false);

  function handleSubmit(values: TFormInput) {
    if (!values.accountName) {
      //send request to get account name here
      form.setValue("accountName", "Ayomide Bamigboye");
      return;
    }

    if (!values.otp) {
      setIsOtpSent(true);
      return;
    }

    //verify otp here
    router.replace(Routes.PaymentSuccess);
  }

  const accountNumber = form.watch("accountNumber");
  const accountName = form.watch("accountName");

  return (
    <div className='py-[40px] flex flex-col gap-[40px]  h-full '>
      <HeaderComponent
        header={
          isOtpSent
            ? "OTP Validation."
            : "Make a payment with your Sparkle account."
        }
        desc={
          isOtpSent
            ? "Input the security code sent to your device with your Sparkle account."
            : "Input your Sparkle account number to proceed with this payment."
        }
      />
      <Form {...form}>
        <form
          id='form-input'
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-4 flex-grow'
        >
          {isOtpSent ? (
            <FormOTP<TFormInput> inputMode='decimal' name='otp' />
          ) : (
            <>
              <FormInput<TFormInput>
                isGrey
                className='placeholder:font-normal'
                placeholder='Enter your Sparkle account number'
                name='accountNumber'
                label='Sparkle account number'
              />
              {accountName && (
                <FormInput<TFormInput>
                  isGrey
                  label='Sparkle account name'
                  name='accountName'
                />
              )}
            </>
          )}
        </form>
      </Form>
      <div className='flex flex-col pt-[40px] gap-[20px] mt-auto'>
        <Button
          form='form-input'
          type='submit'
          className='bg-[#97D700] gap-2 font-satoshi font-semibold text-base'
          disabled={isOtpSent && !form.watch("otp")}
        >
          <span>
            {accountNumber &&
            accountNumber.length == 10 &&
            !isOtpSent &&
            !accountName
              ? "Validate account number"
              : "Continue"}
          </span>
          <IoIosArrowDroprightCircle className='mt-[2px]' color='white' />
        </Button>
        {isOtpSent && (
          <Button
            form='form-input'
            type='submit'
            className='bg-[#14233B] hover:bg-[#14233B]/90 gap-2 font-satoshi font-semibold text-base'
          >
            <span>Send OTP again</span>
            <IoIosArrowDroprightCircle className='mt-[2px]' color='white' />
          </Button>
        )}
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
