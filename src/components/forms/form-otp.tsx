"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn, TFormInput } from "@/lib/utils";

export function FormOTP<T extends Record<string, any>>({
  label,
  name,
  isTextArea,
  containerClassName,
  innerContainerClassName,
  isGrey,
  inputRightElement,
  formDescription,
  className,
}: TFormInput<T>) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            isGrey &&
              "bg-[#F4F4F4] py-[10px] rounded-[8px] px-4 space-y-0 flex flex-col",
            containerClassName
          )}
        >
          {label && (
            <FormLabel
              className={cn(
                "text-sm leading-[22px] font-normal -tracking-[0.4px] text-[#999999]",
                isGrey && "text-[12px]"
              )}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          {formDescription && (
            <FormDescription className='text-[12px] text-[#666666]'>
              {formDescription}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
