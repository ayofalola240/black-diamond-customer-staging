import { getBiddersPerformance } from "@/actions/auction";
import { ClientBiddersDataTable } from "./client-bidders-dataTable";

export const BidderPerformance = async () => {
  const biddersPerformance = await getBiddersPerformance({ page: 1, limit: 5 });
  return <ClientBiddersDataTable data={biddersPerformance} />;
};
