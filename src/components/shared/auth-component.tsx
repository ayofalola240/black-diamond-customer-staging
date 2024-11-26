import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Routes } from "@/lib/utils";
import { InfoImage } from "./info-image";

export const AuthComponent = () => {
  return (
    <>
      <Link
        className={buttonVariants({
          variant: "outline",
          className: "w-fit border-black sm:border-input h-full",
          size: "sm",
        })}
        href={Routes.Signup}
      >
        Create an account
      </Link>
      <Link
        className={buttonVariants({
          variant: "default",
          className: "h-full flex items-center gap-2 rounded-[10px]",
          size: "sm",
        })}
        href={Routes.Login}
      >
        <InfoImage isIcon url='/svgs/login.svg' />
        <span>Log in</span>
      </Link>
    </>
  );
};
