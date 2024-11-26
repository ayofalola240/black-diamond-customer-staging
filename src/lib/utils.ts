import { Input } from "@/components/ui/input";
import { type ClassValue, clsx } from "clsx";
import { ComponentProps, HtmlHTMLAttributes, ReactNode } from "react";
import { UseControllerProps } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Routes {
  Home = "/",
  Search = "/search",
  Login = "/auth/login",
  ForgotPassword = "/auth/forgot-password",
  Signup = "/auth/signup",
  Terms = "/terms",
  Privacy = "/privacy",
  Foundation = "/the-foundation",
  Activities = "/activities",
  LeaderBoards = "/leaderboards",
  WishList = "/watchlist",
  Carts = "/cart",
  AuctionItems = "/auction-items",
  Profile = "/profile",
  PaymentSuccess = "/payment/success",
  VirtualPayment = "/payment/virtual",
  SparklePayment = "/payment/sparkle",
  Notification = "/notifications",
  AccountInformation = "/profile/account-information",
  AddressInformation = "/profile/address-information",
  AuctionInformation = "/profile/auction-information",
  PaymentInformation = "/profile/payment-information",
  Password = "/profile/password",
  NotificationSettings = "/profile/notification-settings",
}

/**
 *
 * @param date
 * @returns string
 * @example 2mins ago
 */
export function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
  }
}

export const privateRoutes: string[] = [
  Routes.Profile,
  Routes.Notification,
  Routes.WishList,
  Routes.Carts,
];
export const authRoutes: string[] = [Routes.Login, Routes.Signup];

export enum cacheTags {
  user = "user",
  currentuser = "currentuser",
  search = "search",
  carts = "carts",
  activeBids = "activeBids",
  auctionItems = "auctionItems",
  auctionWon = "auctionWon",
  watchList = "watchLists",
  notifications = "notifications",
  buyersTransactions = "buyersTransactions",
}

export const formatError = (error: any) => {
  return error.response.data.errors[0].message;
};

export const getInitials = (value: string) => {
  const names = value.split(" ");
  const initials = names
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
};

export const Badges: Record<string, string> = {
  "Fastest Bidder": "/svgs/badges/fastest.svg",
  "Frequent Bidder": "/svgs/badges/frequent.svg",
  "Highest Baller": "/svgs/badges/highest.svg",
  "Lucky Winner": "/svgs/badges/lucky.svg",
  "Top Bidder": "/svgs/badges/top.svg",
};

export const pageLimit = 12;

export type TFormInput<T> = {
  name: keyof T;
  label?: string;
  isGrey?: boolean;
  checkBoxLabel?: any;
  inputRightElement?: ReactNode;
  innerContainerClassName?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  formDescription?: string;
  containerClassName?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  isTextArea?: boolean;
} & UseControllerProps &
  ComponentProps<typeof Input>;
