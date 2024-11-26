"use client";

import { FormInput } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { z } from "zod";
import { IoCameraOutline } from "react-icons/io5";
import { useUser } from "@/components/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/lib/user";
import { toast } from "sonner";
import { axiosClient } from "@/lib/api";
import { cacheTags, formatError } from "@/lib/utils";
import { useTitle } from "@/hooks";

const formSchema = z.object({
  firstName: z.string().min(1),
  roles: z.array(z.string().min(1)),
  lastName: z.string().min(1),
  userName: z.string().optional(),
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number should be exactly 11 digits" })
    .max(11, { message: "Phone number should be exactly 11 digits" }),
  email: z.string().email(),
  photo: z.any().nullable(),
});

type FormType = z.infer<typeof formSchema>;

export default function AccountInformation() {
  useTitle("Account Information");
  const { email, firstName, lastName, image, phoneNumber, userName } =
    useUser();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email,
      firstName,
      lastName,
      roles: ["buyer"],
      userName,
      phoneNumber,
      photo: image?.image_url ? image : null,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (args: FormType | FormData) => {
      return updateUser(args);
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: () => {
      toast.success("Profile Updated");
      queryClient.invalidateQueries({ queryKey: [cacheTags.user] });
    },
  });

  const { mutate: deleteImage } = useMutation({
    mutationFn: () => axiosClient.delete("/users/delete-image"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cacheTags.user] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    if (values.userName) formData.append("userName", values.userName);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("roles", JSON.stringify(values.roles));

    if (typeof values.photo !== "string") {
      formData.append("photo", values.photo);
    }

    mutate(formData);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      form.setValue("photo", e.target.files[0]);
    }
  }

  function clearImage() {
    form.setValue("photo", null);
    deleteImage();
  }

  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-6  sm:flex-row">
        <Form {...form}>
          <form
            id="account-information"
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-4 grid w-full sm:grid-cols-2 "
          >
            <FormInput<FormType>
              placeholder="John"
              label="First Name"
              name="firstName"
            />
            <FormInput<FormType>
              placeholder="Doe"
              label="Last Name"
              name="lastName"
            />

            <FormInput<FormType>
              containerClassName="lg:col-span-2"
              placeholder="johnny"
              label="Alias or nickName(optional)"
              name="userName"
            />
            <FormInput<FormType>
              placeholder="johndoe@gmail.com"
              label="Email"
              readOnly
              type="email"
              name="email"
            />
            <FormInput<FormType>
              placeholder="08011111111"
              label="Phone Number"
              type="number"
              name="phoneNumber"
            />
          </form>
        </Form>
        <div className="flex min-w-fit flex-col gap-[20px]">
          <div className="relative w-[150px] overflow-hidden  rounded-full h-[150px]">
            <Image
              className="object-contain"
              alt="Avatar"
              src={
                form.watch("photo")
                  ? Boolean(form.watch("photo")?.image_url)
                    ? form.watch("photo").image_url
                    : URL.createObjectURL(form.watch("photo"))
                  : "/svgs/avatar.svg"
              }
              fill
            />
          </div>
          <div className="flex gap-2 flex-row items-center">
            <Button
              onClick={() => document.getElementById("avatar-input")?.click()}
              type="button"
              variant="outline"
              size="sm"
              className="space-x-1 font-medium"
            >
              <span>Upload</span>
              <IoCameraOutline />
            </Button>
            <Button onClick={clearImage} variant="outline" size="sm">
              <RiDeleteBin6Line />
            </Button>
          </div>
          <input
            onChange={handleImageChange}
            hidden
            accept="image/*"
            type="file"
            id="avatar-input"
          />
        </div>
      </div>

      <Button
        form="account-information"
        type="submit"
        disabled={isPending}
        className="w-full sm:w-[250px]"
      >
        Save Change
      </Button>
    </section>
  );
}
