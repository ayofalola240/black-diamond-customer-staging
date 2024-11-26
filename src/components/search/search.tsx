/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useForm } from "react-hook-form";
import { SearchFieldContainer, TSchema } from "../home";
import { Form } from "../ui/form";
import { AuctionItem, Empty, Loading, Pagination } from "../shared";
import { TPaginationSearchParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { cacheTags } from "@/lib/utils";
import { searchAuctions } from "@/lib/auction";
import { useEffect } from "react";

interface IProps extends TPaginationSearchParams {
  searchParams: string;
}

export const Search = ({ searchParams, limit, page }: IProps) => {
  const form = useForm<TSchema>({
    defaultValues: {
      search: searchParams,
    },
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: [cacheTags.search, form.watch("search"), page, limit],
    queryFn: () =>
      searchAuctions({ page, limit, search: form.watch("search") }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  function onSubmit() {
    refetch();
  }

  return (
    <section className="w-full text-white py-10">
      <section className="max-w-container px-6 flex flex-col gap-8    mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row  gap-4  items-center w-full"
          >
            <SearchFieldContainer onSubmit={onSubmit} isDisabled={isLoading} />
          </form>
        </Form>
        <section className="flex gap-6 flex-col">
          <h3 className="text-2xl font-medium">Search Result:</h3>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {data?.auctions.length == 0 ? (
                <Empty
                  description="Searched result not found"
                  iconUrl="/svgs/cart.svg"
                  title="Not Found"
                />
              ) : (
                <>
                  <section className="grid grid-cols-1 w-full sm:grid-cols-2 gap-4 lg:grid-cols-3 mx-auto">
                    {data?.auctions.slice(0, 3).map((item) => (
                      <AuctionItem {...item} key={item._id} />
                    ))}
                  </section>
                  <Pagination
                    isServerSide
                    pageSize={limit}
                    currentPage={page}
                    totalCount={data?.pagination?.totalItems || 0}
                  />
                </>
              )}
            </>
          )}
        </section>
      </section>
    </section>
  );
};
