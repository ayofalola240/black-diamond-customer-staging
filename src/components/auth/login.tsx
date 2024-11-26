"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { FormInput } from "../forms";
import { useState, useTransition } from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cacheTags, Routes } from "@/lib/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthLayout } from "./auth-layout";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { createAxiosClient } from "@/lib/api";
import { login } from "@/lib/auth";

const formSchema = z.object({
  email: z.string().email(),
  roles: z.array(z.string().min(1)),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

type TType = z.infer<typeof formSchema>;

interface IProps {
  isEmbedded?: boolean;
  setIsModalOpen?: (value: boolean) => void;
}

export const LoginComponent = ({
  isEmbedded = false,
  setIsModalOpen,
}: IProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
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
      login(values).then((response) => {
        if (response) {
          if ("error" in response) {
            toast.error(response?.error);
          } else if ("data" in response) {
            queryClient.invalidateQueries({ queryKey: [cacheTags.user] });
            queryClient.invalidateQueries({ queryKey: [cacheTags.carts] });
            queryClient.invalidateQueries({
              queryKey: [cacheTags.notifications],
            });
            queryClient.invalidateQueries({
              queryKey: [cacheTags.watchList],
            });

            // Close modal if applicable and show success message
            setIsModalOpen && setIsModalOpen(false);
            toast.success("success");
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

          <div className="flex justify-end">
            <Link
              href={Routes.ForgotPassword}
              className={buttonVariants({
                variant: "link",
                className: "text-sm  font-medium font-inter",
              })}
            >
              Forgot Password?
            </Link>
          </div>
          <Button disabled={isPending} className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};
