import { ComponentProps } from "react";
import { buttonVariants } from "../ui/button";
import { Routes } from "@/lib/utils";
import Link from "next/link";
import { FaRegBell } from "react-icons/fa";
import { LuHeart, LuShoppingCart, LuUser } from "react-icons/lu";
import {
  useCountDown,
  useGetAuctions,
  useGetNotifications,
  useGetUser,
  useGetWishLists,
} from "@/hooks";
import { useCart } from "@/hooks/use-carts";
import { MdAccessAlarm } from "react-icons/md";

interface IProps extends Partial<ComponentProps<typeof Link>> {}

interface IButtonProps extends Partial<ComponentProps<typeof Link>> {
  icon: React.ComponentType<any>;
  label?: string;
  href: any;
}

export const ButtonLink = ({
  icon: Icon,
  href,
  label,
  className,
  ...rest
}: IButtonProps) => {
  return (
    <Link
      className={buttonVariants({
        variant: "outline",
        size: "sm",
        className:
          "p-0 space-x-2 py-2 sm:py-0 sm:h-[48px]  !justify-start sm:justify-center",
      })}
      href={href}
      {...rest}
    >
      <Icon className=" text-lg sm:text-xl" />
      <span>{label}</span>
    </Link>
  );
};

export const AuctionTimer = () => {
  const { data, isPending } = useGetAuctions({
    page: 1,
    limit: 1,
    status: "ongoing",
  });
  const item = data?.auctions[0];
  const { isClosed, time } = useCountDown({
    enabled: item?.status == "ongoing",
    status: item?.status,
    closingDate: item?.endTime,
  });

  if (isPending || data?.auctions.length == 0 || isClosed) return null;

  return (
    <div
      className={buttonVariants({
        variant: "outline",
        size: "sm",
        className:
          "p-0 flex opacity-50 !justify-start sm:justify-center space-x-2 py-2 sm:py-0 sm:h-[48px]",
      })}
    >
      <MdAccessAlarm className=" text-lg sm:text-xl" />
      <span>{time}</span>
    </div>
  );
};

export const NotificationBell = ({ className, ...rest }: IProps) => {
  const { countOfNewNotification } = useGetNotifications();
  return (
    <Link
      className={buttonVariants({
        variant: "outline",
        size: "sm",
        className:
          "p-0 flex !justify-start sm:justify-center space-x-2 py-2 sm:py-0 sm:h-[48px]",
      })}
      href={Routes.Notification}
      {...rest}
    >
      <FaRegBell className=" text-lg sm:text-xl" />
      <span>
        {countOfNewNotification} Notification{countOfNewNotification > 1 && "s"}
      </span>
    </Link>
  );
};

export const ShoppingCartComponent = ({ className, ...rest }: IProps) => {
  const { isPending, cartLength } = useCart();
  return (
    <ButtonLink
      icon={LuShoppingCart}
      href={Routes.Carts}
      className={className}
      label={isPending ? `Loading...` : `${cartLength} Item in Cart`}
      {...rest}
    />
  );
};

export const WishList = ({ className, ...rest }: IProps) => {
  const { data, isPending } = useGetWishLists();
  const watchListCount = data?.auctionIds.length || 0;
  return (
    <ButtonLink
      icon={LuHeart}
      href={Routes.WishList}
      className={className}
      label={
        isPending
          ? "Loading..."
          : `${watchListCount} Item${
              watchListCount > 1 ? "s" : ""
            } in watchlist`
      }
      {...rest}
    />
  );
};

export const UserComponent = ({ className, ...rest }: IProps) => {
  const { data: user, isPending } = useGetUser();

  return (
    <ButtonLink
      icon={LuUser}
      label={isPending ? "Loading..." : `${user?.firstName} ${user?.lastName}`}
      href={Routes.Profile}
      className={className}
      {...rest}
    />
  );
};
