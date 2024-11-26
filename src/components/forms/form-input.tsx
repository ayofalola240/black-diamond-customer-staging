"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn, TFormInput } from "@/lib/utils";

export const FormInput = <T extends Record<string, any>>({
  label,
  name,
  isTextArea,
  containerClassName,
  innerContainerClassName,
  isGrey, //to be use for payment
  inputRightElement,
  formDescription,
  className,
  ...rest
}: TFormInput<T>) => {
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

          <div
            className={cn(
              "flex flex-row h-[50px] items-center justify-between border border-input bg-transparent rounded-md  ring-offset-background px-3 py-2 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
              isGrey &&
                "h-[24px] py-0 focus-within:ring-0  border-none focus-within:ring-offset-0 px-0",
              innerContainerClassName
            )}
          >
            <FormControl>
              <Input
                className={cn(
                  "text-sm h-full font-normal rounded-[4px]  text-white",
                  isGrey &&
                    "text-base font-semibold font-satoshi text-[#121312]",
                  className
                )}
                {...field}
                {...rest}
              />
            </FormControl>
            {inputRightElement && inputRightElement}
          </div>

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
};
