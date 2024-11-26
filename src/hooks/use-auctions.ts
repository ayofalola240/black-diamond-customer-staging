import { axiosClient } from "@/lib/api";
import { cacheTags, formatError } from "@/lib/utils";
import {
  TActiveBids,
  TAuctions,
  TInventory,
  TPaymentTransactions,
} from "@/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface Props extends Partial<UseQueryOptions> {
  page?: number;
  limit?: number;
  status?: string;
}

const getAuctions = async ({
  page,
  limit,
  status,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}) => {
  const { data } = await axiosClient.get(
    `/auctions/?page=${page}&limit=${limit}&key=${search}${
      status || status !== "all" ? `&status=${status}` : ""
    }`
  );
  return data as TAuctions;
};

const getAuction = async (uid: string) => {
  const { data } = await axiosClient.get(`/auctions/${uid}`);
  return data.auction as TInventory;
};

export const useGetAuctions = ({ page = 1, limit = 4 }: Props) => {
  const data = useQuery({
    queryKey: [cacheTags.auctionItems, page, limit],
    queryFn: () => getAuctions({ page, limit }),
    placeholderData: keepPreviousData,
  });
  return data;
};

export const useGetActiveBids = ({ page = 1, limit = 4 }: Props) => {
  const data = useQuery({
    queryKey: [cacheTags.activeBids, page, limit],
    queryFn: () =>
      axiosClient
        .get(`/bids/active-bids?page=${page}&limit=${limit}`)
        .then((res) => res.data as TActiveBids),
    placeholderData: keepPreviousData,
  });
  return data;
};

interface IAuction extends Partial<UseQueryOptions<TInventory>> {
  slug: string;
}
export const useGetAuction = ({ slug, ...rest }: IAuction) => {
  const data = useQuery({
    queryKey: [cacheTags.auctionItems, slug],
    queryFn: () => getAuction(slug),
    enabled: !!slug,
    ...rest,
  });
  return data;
};

export const useGetAuctionsWon = ({ limit = 4, page = 1 }: Props) => {
  const data = useQuery({
    queryKey: [cacheTags.auctionWon, page, limit],
    queryFn: () => getAuctions({ page, limit }),
    placeholderData: keepPreviousData,
  });
  return data;
};

export const useGetWishLists = () => {
  const data = useQuery({
    queryKey: [cacheTags.watchList],
    queryFn: () =>
      axiosClient.get("/users/watchlist").then(
        (res) =>
          res.data as {
            auctionIds: TInventory[];
            userId: string;
            updatedAt: Date;
          }
      ),
    retry: false,
  });
  return data;
};

export const useGetBuyersTransactions = ({
  limit = 4,
  page = 1,
  item,
}: Props & {
  item: "received" | "not_received";
}) => {
  const data = useQuery({
    queryKey: [cacheTags.buyersTransactions, page, limit, item],
    queryFn: () =>
      axiosClient
        .get(`/payments/transactions?page=${page}&limit=${limit}&item=${item}`)
        .then((res) => res.data as TPaymentTransactions),
    placeholderData: keepPreviousData,
  });
  return data;
};

export const useAddWishList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (auctionId: string) => {
      return axiosClient.post("/users/watchlist", { auctionId });
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [cacheTags.watchList] });
      toast.success("Added to wishlist");
    },
  });
};

export const useDeleteWatchList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (auctionId: string) => {
      return axiosClient.delete(`/users/watchlist`, { data: { auctionId } });
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [cacheTags.watchList] });
      toast.success("Removed from wishlist");
    },
  });
};
