"use server";

import {
  TAuctionPerformance,
  TAuctions,
  TBiddersPerformance,
  TBids,
  TInventory,
  TPaginationSearchParams,
} from "@/types";
import { getServerClient } from "./shared-fn";
import { formatError } from "@/lib/utils";

export const getAuctions = async ({
  page,
  limit,
  status,
}: TPaginationSearchParams) => {
  const serverClient = await getServerClient();
  const res = await serverClient.get(
    `/auctions/?page=${page}&limit=${limit}` +
      (status ? `&status=${status}` : "")
  );
  return res.data as TAuctions;
};

export const getAuctionByCategory = async ({
  page,
  limit,
  category,
  status,
}: TPaginationSearchParams & { category: string; status?: string }) => {
  const serverClient = await getServerClient();
  const url = `/auctions/categories-auctions?page=${page}&limit=${limit}&category=${encodeURIComponent(
    category
  )}`;
  const res = await serverClient.get(url);
  return res.data as TAuctions;
};

export const getAuction = async (uid: string) => {
  try {
    const serverClient = await getServerClient();
    const { data } = await serverClient.get(`/auctions/${uid}`);
    return data.auction as TInventory;
  } catch (error) {
    return { error: formatError(error) };
  }
};

export const getAuctionBids = async ({
  page,
  limit,
  auctionId,
}: TPaginationSearchParams & { auctionId: string }) => {
  const serverClient = await getServerClient();
  const res = await serverClient.get(
    `/auctions/${auctionId}/bids/?page=${page}&limit=${limit}`
  );
  return res.data as TBids;
};

export const getAllBids = async ({ page, limit }: TPaginationSearchParams) => {
  const serverClient = await getServerClient();
  const res = await serverClient.get(`/bids?page=${page}&limit=${limit}`);
  return res.data as TBids;
};

export const getBiddersPerformance = async ({
  page,
  limit,
}: TPaginationSearchParams) => {
  const serverClient = await getServerClient();
  const res = await serverClient.get(
    `/users/bidders-performance?page=${page}&limit=${limit}`
  );
  return res.data as TBiddersPerformance;
};

export const getAuctionPerformance = async ({
  page,
  limit,
}: TPaginationSearchParams) => {
  const serverClient = await getServerClient();
  const res = await serverClient.get(
    `/auctions/auctions-performance?page=${page}&limit=${limit}`
  );
  return res.data as TAuctionPerformance;
};
