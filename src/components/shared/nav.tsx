"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { usePathname } from "next/navigation";
import { cn, Routes } from "@/lib/utils";
import { Button } from "../ui/button";
import { AuthComponent } from "./auth-component";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchFieldContainer, TSchema } from "../home";
import { Form } from "../ui/form";
import { ProtectedNavComponent } from "./protected-nav-component";
import { useGetUser } from "@/hooks";

const routesToHideComponent = [Routes.Search] as string[];

export const Nav = () => {
  const pathname = usePathname();
  const { data } = useGetUser();

  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const isAuth = !!data;

  useEffect(() => {
    setIsPopOverOpen(false);
  }, [pathname]);

  return (
    <nav className={cn(" text-white bg-black")}>
      <div className="py-3 px-6  border-b-[0.4px] border-[#EEEEEE]">
        <div className="flex max-w-container mx-auto w-full justify-end gap-8">
          <Link
            className={`font-weight ${
              pathname === Routes.Activities ? "opacity-50" : ""
            }`}
            aria-disabled={pathname === Routes.Activities}
            href={Routes.Activities}
          >
            Activity
          </Link>
          <Link
            className={`font-weight ${
              pathname === Routes.LeaderBoards ? "opacity-50" : ""
            }`}
            aria-disabled={pathname === Routes.LeaderBoards}
            href={Routes.LeaderBoards}
          >
            LeaderBoard
          </Link>
        </div>
      </div>
      <div className={cn("bg-opacity-10 w-full bg-black px-6")}>
        <div className="flex max-w-container mx-auto  flex-row py-5  justify-between">
          <Link href={Routes.Home}>
            <Image
              width={60}
              height={50}
              alt="Black Diamon's Logo"
              src="/svgs/logo.svg"
            />
          </Link>
          <div className="flex flex-row gap-4 items-center">
            {/* Hide this on mobile */}
            <div className="hidden lg:flex  h-full flex-row gap-4">
              <ProtectedNavComponent isAuth={isAuth} />
              {!isAuth && <AuthComponent />}
            </div>
            <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
              <PopoverTrigger className="lg:hidden" asChild>
                <Button className="lg:w-[52px] lg:h-[48px]" size="sm">
                  <FaBars className="text-lg" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full flex flex-col gap-2">
                {isAuth ? (
                  <ProtectedNavComponent isAuth={isAuth} />
                ) : (
                  <AuthComponent />
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <Search />
    </nav>
  );
};

const Search = () => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<TSchema>({
    defaultValues: {
      search: "",
    },
  });
  function onSubmit(values: TSchema) {
    if (!values) return;
    form.reset();
    router.push(`/search/${values.search}`);
  }

  return (
    <>
      {!(
        pathname === "/" ||
        routesToHideComponent.some((route) => pathname.startsWith(route))
      ) && (
        <div className="py-5 px-6 border-y-[0.4px] border-[#EEEEEE]">
          <Form {...form}>
            <form
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col  max-w-container mx-auto w-full"
            >
              <SearchFieldContainer
                className="min-w-full border"
                isUseOnNavbar
              />
            </form>
          </Form>
        </div>
      )}
    </>
  );
};
