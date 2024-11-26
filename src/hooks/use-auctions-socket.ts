import { useRef } from "react";
import { initializeSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";

export const useAuctionSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  const initializeAuctionSocket = () => {
    try {
      if (!socketRef.current) {
        socketRef.current = initializeSocket();

        const handleAuctionEvent = (data: any) => {
          console.log(`Auction event received:`, data);
          window.location.reload();
        };

        socketRef.current.on("auctionStart", handleAuctionEvent);
        socketRef.current.on("auctionComplete", handleAuctionEvent);
      }
    } catch (error) {
      console.error("Failed to initialize socket:", error);
    }
  };

  const cleanupAuctionSocket = () => {
    if (socketRef.current) {
      socketRef.current.off("auctionStart");
      socketRef.current.off("auctionComplete");
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  return { initializeAuctionSocket, cleanupAuctionSocket };
};
