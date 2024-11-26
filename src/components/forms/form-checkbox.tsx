"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { TFormInput } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

export const FormCheckBox = <T extends Record<string, any>>({
  label,
  checkBoxLabel,
  name,
  containerClassName,
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
        <FormItem className={containerClassName}>
          {label && (
            <FormLabel className='text-sm leading-[22px] font-normal -tracking-[0.4px] text-[#999999]'>
              {label}
            </FormLabel>
          )}
          <div className='flex items-center space-x-2'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className='text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              {checkBoxLabel}
            </FormLabel>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
