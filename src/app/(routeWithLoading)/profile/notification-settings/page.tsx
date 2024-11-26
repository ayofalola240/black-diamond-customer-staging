"use client";

import { FormSelect } from "@/components/forms";
import { useUser } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { YesNoArray } from "@/constant";
import { useTitle } from "@/hooks";
import { axiosClient } from "@/lib/api";
import { cacheTags } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  biddingUpdate: z.string().min(1),
  newListing: z.string().min(1),
  watchlistActivities: z.string().min(1),
  paymentUpdate: z.string().min(1),
  auctionEnded: z.string().min(1),
});

type FormType = z.infer<typeof formSchema>;

export default function NotificationSettings() {
  useTitle("Notification Settings");
  const { notificationSettings } = useUser();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: notificationSettings,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (args: FormType) =>
      axiosClient.put("/notifications/notification-settings", args),
    onError: (error) => {
      toast.error("An error occurred. Please try again");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [cacheTags.user] });
      toast.error("Updated!");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <section className='w-full max-w-[720px] flex flex-col gap-6'>
      <Form {...form}>
        <form
          id='notification-settings'
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full gap-4 grid'
        >
          <FormSelect<FormType>
            placeholder='Select'
            label='Bidding Update'
            name='biddingUpdate'
            options={YesNoArray}
          />
          <FormSelect<FormType>
            placeholder='Select'
            label='New Listing Auction'
            name='newListing'
            options={YesNoArray}
          />
          <FormSelect<FormType>
            placeholder='Select'
            label='Watchlist Activity'
            name='watchlistActivities'
            options={YesNoArray}
          />
          <FormSelect<FormType>
            placeholder='Select'
            label='Payment Reminder'
            name='paymentUpdate'
            options={YesNoArray}
          />
          <FormSelect<FormType>
            placeholder='Select'
            label='Auction Ended'
            name='auctionEnded'
            options={YesNoArray}
          />
        </form>
      </Form>
      <Button
        form='notification-settings'
        disabled={isPending}
        className='w-full sm:w-[250px]'
      >
        Save Change
      </Button>
    </section>
  );
}
