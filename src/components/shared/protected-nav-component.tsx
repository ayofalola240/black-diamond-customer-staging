"use client";
import { usePathname } from "next/navigation";
import {
  NotificationBell,
  ShoppingCartComponent,
  UserComponent,
  AuctionTimer,
  WishList,
} from "./nav-components";
import { cn, Routes } from "@/lib/utils";

interface IProps {
  isAuth?: boolean;
}
export const ProtectedNavComponent = ({ isAuth }: IProps) => {
  const pathname = usePathname();

  return (
    <>
      <AuctionTimer />
      <NotificationBell
        className={cn(pathname.startsWith(Routes.Notification) && "opacity-50")}
        aria-disabled={pathname.includes(Routes.Notification)}
      />

      <WishList
        className={cn(pathname.includes(Routes.WishList) && "opacity-50")}
        aria-disabled={pathname.includes(Routes.WishList)}
      />

      <ShoppingCartComponent
        className={cn(pathname.includes(Routes.Carts) && "opacity-50")}
        aria-disabled={pathname.includes(Routes.Carts)}
      />

      {isAuth && (
        <UserComponent
          className={cn(pathname.includes(Routes.Profile) && "opacity-50")}
          aria-disabled={pathname.includes(Routes.Profile)}
        />
      )}
    </>
  );
};
