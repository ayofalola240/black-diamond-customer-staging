import { axiosClient } from "@/lib/api";
import { cacheTags } from "@/lib/utils";
import { TInventory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { error } from "console";
import { useEffect, useState } from "react";
export interface TCartItem {
  auction: TInventory;
  addedAt: Date;
  expiresAt: Date;
  _id: string;
}

export interface TCart {
  userId: string;
  items: {
    addedAt: Date;
    expiresAt: Date;
    auction: TInventory;
  }[];
  totalItems: 0;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export const useCart = () => {
  const [cartLength, setCartLength] = useState(0);
  const data = useQuery({
    queryKey: [cacheTags.carts],
    queryFn: () => axiosClient.get<TCart>("/users/cart"),
    staleTime: 1000 * 60 * 3, //3mins stale time
    retry: false,
  });

  useEffect(() => {
    if (data.data) {
      setCartLength(data.data.data.totalItems || 0);
    }
  }, [data.data]);

  return { ...data, cartLength };
};
