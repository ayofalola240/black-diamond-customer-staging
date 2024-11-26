import { getAuctionPerformance } from "@/actions/auction";
import { ItemsPerformanceDataTable } from "./items-performance-dataTable";

export const ItemsPerformance = async () => {
  const auctionPerformance = await getAuctionPerformance({ page: 1, limit: 5 });
  return <ItemsPerformanceDataTable data={auctionPerformance} />;
};
