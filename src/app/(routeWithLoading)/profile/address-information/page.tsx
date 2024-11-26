"use client";

import { FormInput, FormSelect } from "@/components/forms";
import { useUser } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTitle } from "@/hooks";
import { updateUser } from "@/lib/user";
import { cacheTags, formatError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import NaijaStates from "naija-state-local-government";

const formSchema = z.object({
  addressLine1: z.string().min(1),
  addressLine2: z.string().optional(),
  lga: z.string().min(1),
  state: z.string().min(1),
});

type FormType = z.infer<typeof formSchema>;

export default function AddressInformation() {
  useTitle("Address Information");
  const { addressDetails } = useUser();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: addressDetails,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (args: FormType | FormData) => {
      return updateUser({
        addressDetails: args,
      });
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: () => {
      toast.success("Address Updated");
      queryClient.invalidateQueries({ queryKey: [cacheTags.user] });
    },
  });

  return (
    <section className='w-full max-w-[720px] flex flex-col gap-6'>
      <Form {...form}>
        <form
          id='address-information'
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full gap-4 grid'
        >
          <FormInput<FormType>
            placeholder='765 Samuel Adedoyin Street,'
            label='Address Line 1'
            name='addressLine1'
          />
          <FormInput<FormType>
            placeholder='Victoria Island Lagos'
            label='Address Line 2'
            name='addressLine2'
          />
          <div className='grid grid-cols sm:grid-cols-2 gap-6'>
            <FormSelect<FormType>
              placeholder='Select'
              label='State'
              name='state'
              options={NaijaStates.states()}
            />
            {form.watch("state") && (
              <FormSelect<FormType>
                placeholder='Select'
                label='LGA'
                name='lga'
                options={NaijaStates.lgas(form.watch("state")).lgas}
              />
            )}
          </div>
        </form>
      </Form>
      <Button
        disabled={isPending}
        form='address-information'
        className='w-full sm:w-[250px]'
      >
        Save Change
      </Button>
    </section>
  );
}
