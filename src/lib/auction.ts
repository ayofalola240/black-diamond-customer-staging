import { TAuctions } from "@/types";
import { axiosClient } from "./api";

export const searchAuctions = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const { data } = await axiosClient.get(
    `/auctions/search?page=${page}&limit=${limit}&key=${search}`
  );
  return data as TAuctions;
};
