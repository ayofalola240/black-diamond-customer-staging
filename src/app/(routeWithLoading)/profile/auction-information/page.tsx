"use client";
import { AuctionWon, CurrentActiveBid } from "@/components/auction-information";
import { useUser } from "@/components/profile";
import { Loading } from "@/components/shared";
import { Badges } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";

export default function AuctionPage() {
  const data = useUser();
  return (
    <section className="space-y-[40px] max-w-[794px]">
      {data?.badges.length > 0 && (
        <article className="gap-4 flex-col flex">
          <h2>Badges Won</h2>
          <ul className="flex flex-row gap-2 flex-wrap">
            {data?.badges.map((badge) => (
              <li key={badge} className="flex flex-row gap-1">
                <Image
                  alt={`${badge} bidder Icon`}
                  src={Badges[badge]}
                  width={24}
                  height={24}
                />
                <p className="text-[#999999]">{badge}</p>
              </li>
            ))}
          </ul>
        </article>
      )}

      <Suspense fallback={<Loading />}>
        <CurrentActiveBid />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <AuctionWon />
      </Suspense>
    </section>
  );
}
