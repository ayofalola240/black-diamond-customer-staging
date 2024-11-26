"use client";

import { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn, Routes } from "@/lib/utils";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { TSocialLogin } from "@/types";

export const AuthLayout = ({
  children,
  isEmbedded,
}: {
  children: ReactNode;
  isEmbedded: boolean;
}) => {
  const pathname = usePathname();

  function socialLogin(arg: TSocialLogin) {
    window.location.href = `${process.env.NEXT_PUBLIC_Backend_URL}/api/v1/auth/${arg}`;
  }

  return (
    <section className="bg-white w-full">
      <section
        className={cn(
          "max-w-[532px] gap-6 flex flex-col py-[10px] sm:py-[50px] w-full mx-auto",
          isEmbedded && "px-6 py-[50px]"
        )}
      >
        {children}
        <p className="w-full font-inter text-lg text-center border-input  border-[1px] text-[#999999] leading-[0.005em] m-[10px_0_20px]">
          <span className="bg-white p-[0_10px]">Or</span>
        </p>
        <div className="flex flex-col gap-6">
          <div className="w-full items-center flex flex-row justify-between gap-4">
            <Button
              onClick={() => socialLogin("google")}
              className="font-inter border-black rounded-[4px] flex items-center gap-2 w-full text-lg"
              variant="outline"
            >
              <FaGoogle size={22} />
              <span>Google</span>
            </Button>
            {/* <Button
              onClick={() => socialLogin("facebook")}
              className="font-inter border-black rounded-[4px] flex items-center gap-2  w-full text-lg"
              variant="outline"
            >
              <FaFacebook size={22} />
              <span>Facebook</span>
            </Button> */}
          </div>
          <hr />
          <div className="text-sm flex items-center flex-row gap-2 font-medium">
            <p className="text-[#999999] font-normal">
              {pathname.includes(Routes.Login)
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="font-medium"
              href={
                pathname.includes(Routes.Signup) ? Routes.Login : Routes.Signup
              }
            >
              {pathname.includes(Routes.Signup) ? "Sign In" : "Sign Up"}
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};
