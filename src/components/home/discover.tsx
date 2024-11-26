"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  FloatingOverlay,
  useDismiss,
  useRole,
  useInteractions,
  shift,
  useFloating,
} from "@floating-ui/react";
import { useEffect, useState } from "react";
import { cacheTags, cn } from "@/lib/utils";
import { AuctionItem, Loading } from "../shared";
import { useRouter } from "nextjs-toploader/app";
import { SearchFieldContainer } from "./search-field-container";
import { useQuery } from "@tanstack/react-query";
import { useWindowDimensions } from "@/hooks";
import { searchAuctions } from "@/lib/auction";
import NotFound from "@/app/not-found";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Schema = z.object({
  search: z.string().min(1),
});
export type TSchema = z.infer<typeof Schema>;

export const Discover = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    strategy: "fixed",
    placement: "bottom-start",
    onOpenChange: setIsOpen,
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "dialog",
  });
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.replace("/");
    }
  }, [error]);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const form = useForm<TSchema>({
    defaultValues: {
      search: "",
    },
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: [cacheTags.search, form.watch("search")],
    queryFn: () =>
      searchAuctions({ page: 1, limit: 4, search: form.watch("search") }),
    enabled: false, //disable this by query, we would manually use the button to refetch
  });

  function onSubmit(values: TSchema) {
    //for smaller screen, just redirect to a designated search page, for larger screen, open modal
    if (width < 600) return router.push(`/search/${values.search}`);
    refetch();
    setIsOpen(true);
  }

  return (
    <>
      <Form {...form}>
        <form
          autoComplete='off'
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col  sm:flex-row gap-4 sm:gap-6 items-center w-full'
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <SearchFieldContainer onSubmit={onSubmit} isDisabled={isLoading} />
        </form>
      </Form>

      {isOpen && (
        <FloatingPortal>
          <FloatingOverlay className='bg-black/70'>
            <section
              ref={refs.setFloating}
              {...getFloatingProps()}
              style={{ ...floatingStyles }}
              className={cn(
                "text-white bg-[#111] flex flex-col gap-4 py-[20px] px-[20px]  max-w-container mx-auto"
              )}
            >
              <header className='flex items-center justify-between'>
                <h3 className='text-2xl font-medium'>Search Result</h3>
                <Button
                  onClick={() => setIsOpen(false)}
                  className='border-2 border-black w-8 h-8 p-0 rounded-full'
                  variant='ghost'
                >
                  <X size={18} />
                </Button>
              </header>

              {isLoading ? (
                <Loading style={{ width: width - 95 + "px" }} />
              ) : (
                <>
                  {data?.auctions.length == 0 ? (
                    <NotFound />
                  ) : (
                    <>
                      <section className='grid grid-cols-1 w-full sm:grid-cols-2 gap-4 lg:grid-cols-3 mx-auto'>
                        {data?.auctions.slice(0, 3).map((item) => (
                          <AuctionItem {...item} key={item._id} />
                        ))}
                      </section>
                      {data!?.auctions?.length > 3 && (
                        <Button
                          disabled={!Boolean(form.watch("search"))}
                          onClick={() =>
                            router.push(`/search/${form.getValues("search")}`)
                          }
                          size='sm'
                          className='w-fit self-center mt-4'
                        >
                          View More
                        </Button>
                      )}
                    </>
                  )}
                </>
              )}
            </section>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
};
