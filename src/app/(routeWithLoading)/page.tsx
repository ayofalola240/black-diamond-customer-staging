"use client";

import { Categories } from "@/components/home/categories";
import { AuctionItems, Discover } from "@/components/home";
import { Loading } from "@/components/shared";
import { pageLimit } from "@/lib/utils";
import { Suspense, useEffect, useState, useCallback } from "react";
import { axiosClient } from "@/lib/api";
import { initializeSocket } from "@/lib/socket";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || pageLimit;

  const [categories, setCategories] = useState<any[]>([]);
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching data...");
      const [categoriesData, auctionsData] = await Promise.all([
        axiosClient.get(`/auctions/categories-overview`),
        axiosClient.get(`/auctions?page=${page}&limit=${limit}&status=ongoing`),
      ]);

      setCategories(categoriesData.data.data);
      setAuctions(auctionsData.data.auctions);
      console.log("Data fetched successfully.");
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    console.log("Initializing socket...");
    // Fetch initial data
    fetchData();

    // Initialize socket connection
    const socket = initializeSocket();

    // Define event handlers
    const handleAuctionStart = (data: any) => {
      console.log("Auction started:", data);
      fetchData(); // Refetch data when auction starts
    };

    const handleAuctionComplete = (data: any) => {
      console.log("Auction completed:", data);
      fetchData(); // Refetch data when auction completes
    };

    // Check if socket is connected
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected.");
    });

    // Listen to socket events
    socket.on("auctionStart", handleAuctionStart);
    socket.on("auctionComplete", handleAuctionComplete);

    // Cleanup socket connection and event listeners on component unmount
    return () => {
      console.log("Cleaning up socket...");
      socket.off("auctionStart", handleAuctionStart);
      socket.off("auctionComplete", handleAuctionComplete);
    };
  }, [fetchData]); // Add fetchData to the dependency array

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col w-full">
      <section className="bg-auth-bg bg-[#I] text-white flex flex-col bg-cover w-full">
        <article className="max-w-container px-6 py-[120px] w-full mx-auto">
          <div className="max-w-[720px] flex flex-col gap-4 mr-auto ">
            <p className="font-medium">Black Diamond Foundation Auction</p>
            <h1 className="text-[32px] leading-[40px] sm:leading-[60px] font-bold sm:text-[48px]">
              Find Your Favourite
              <br /> Gadget at our Auction!
            </h1>
            <p className="font-medium text-lg sm:text-xl">
              Discover amazing deals on second-hand gadgets at our auction
              website. Start bidding now and get your favourite gadgets at
              unbeatable prices!
            </p>
            <Discover />
          </div>
        </article>
        {categories.length > 0 && (
          <Suspense fallback={<Loading />}>
            <Categories categories={categories} />
          </Suspense>
        )}
      </section>

      {auctions.length > 0 && (
        <Suspense fallback={<Loading />}>
          <AuctionItems auctions={auctions} />
        </Suspense>
      )}
    </section>
  );
}
