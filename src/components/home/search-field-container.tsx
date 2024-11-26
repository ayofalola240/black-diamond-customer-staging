"use client";
import { TSchema } from "./discover";
import { FormInput } from "../forms";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  isUseOnNavbar?: boolean;
  isDisabled?: boolean;
  onSubmit?: any;
}

export const SearchFieldContainer = ({
  isUseOnNavbar = false,
  className,
  isDisabled,
  onSubmit,
}: IProps) => {
  const form = useFormContext();

  return (
    <>
      <FormInput<TSchema>
        name='search'
        innerContainerClassName='border-[0.5px] rounded-[4px]  border-white w-full'
        containerClassName={cn(
          "w-full sm:max-w-[360px]",
          isUseOnNavbar && "sm:max-w-full"
        )}
        className={cn(" text-white")}
        placeholder='Search for phones and tablets etc.'
        inputRightElement={
          <Button
            form='search-form'
            type='submit'
            disabled={!isUseOnNavbar || !Boolean(form.watch("search"))}
            variant='link'
            className={cn("text-white no-underline")}
          >
            <Search size={18} />
          </Button>
        }
      />

      {!isUseOnNavbar && (
        <Button
          onClick={() => form.handleSubmit(onSubmit)()}
          disabled={isDisabled || !Boolean(form.watch("search"))}
          className='h-[50px] w-full sm:w-fit'
        >
          Discover
        </Button>
      )}
    </>
  );
};
