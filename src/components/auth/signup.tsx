"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { FormCheckBox, FormInput } from "../forms";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cacheTags } from "@/lib/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthLayout } from "./auth-layout";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { useQueryClient } from "@tanstack/react-query";
import { register } from "@/lib/auth";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    roles: z.array(z.string().min(1)),
    nickName: z.string().optional(),
    email: z.string().email(),
    terms: z.boolean().default(false),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match.",
  })
  .refine((data) => data.terms, {
    path: ["terms"],
    message: "You must accept the terms and conditions.",
  });

type TType = z.infer<typeof formSchema>;

interface IProps {
  isEmbedded?: boolean;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignupComponent = ({
  isEmbedded = false,
  setIsModalOpen,
}: IProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const form = useForm<TType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      roles: ["buyer"],
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: TType) {
    startTransition(() => {
      register(values).then((response) => {
        if (response) {
          if ("error" in response) {
            toast.error(response.error);
          } else if ("data" in response) {
            // Handle successful response
            queryClient.invalidateQueries({ queryKey: [cacheTags.user] });
            queryClient.invalidateQueries({ queryKey: [cacheTags.carts] });
            queryClient.invalidateQueries({
              queryKey: [cacheTags.notifications],
            });

            setIsModalOpen && setIsModalOpen(false);
            toast.success("Account created successfully!");
            router.back();
          }
        }
      });
    });
  }

  return (
    <AuthLayout isEmbedded={isEmbedded}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-row items-start justify-between gap-4">
            <FormInput<TType>
              innerContainerClassName="border-black focus-within:ring-0"
              className="text-black placeholder:text-black/80 "
              containerClassName="w-full"
              placeholder="john"
              label="First Name"
              name="firstName"
            />
            <FormInput<TType>
              innerContainerClassName="border-black focus-within:ring-0"
              className="text-black placeholder:text-black/80 "
              containerClassName="w-full"
              placeholder="doe"
              label="Last Name"
              name="lastName"
            />
          </div>
          <FormInput<TType>
            innerContainerClassName="border-black focus-within:ring-0"
            className="text-black placeholder:text-black/80 "
            placeholder="Black Knight"
            label="Alias or Nickname (optional)"
            formDescription="To be used when you bid and on the leaderboard"
            name="nickName"
          />
          <FormInput<TType>
            innerContainerClassName="border-black focus-within:ring-0"
            className="text-black placeholder:text-black/80 "
            placeholder="johndoe@gmail.com"
            label="Email"
            type="email"
            name="email"
          />
          <FormInput<TType>
            innerContainerClassName="border-black focus-within:ring-0"
            className="text-black placeholder:text-black/80 "
            placeholder="password"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            inputRightElement={
              <button
                type="button"
                className="text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />
          <FormInput<TType>
            innerContainerClassName="border-black focus-within:ring-0"
            className="text-black placeholder:text-black/80 "
            placeholder="Confirm password"
            label="Confirm Password"
            name="passwordConfirm"
            type={showPassword ? "text" : "password"}
            inputRightElement={
              <button
                type="button"
                className="text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />
          <FormCheckBox<TType>
            checkBoxLabel={
              <>
                Agree with our{" "}
                <Link className="font-medium" href="#">
                  Terms & Condition
                </Link>{" "}
                and{" "}
                <Link className="font-medium" href="#">
                  Privacy Policy
                </Link>
              </>
            }
            name="terms"
          />
          <Button disabled={isPending} className="w-full">
            Sign Up
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};
