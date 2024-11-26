"use client";

import { SignupComponent } from "@/components/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default function SignupModal() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className='sm:max-w-[532px] overflow-y-scroll max-h-[90svh]'>
        <DialogHeader>
          <DialogTitle>Create an Account</DialogTitle>
          <button onClick={() => router.back()}>
            <IoIosCloseCircle size={24} />
          </button>
        </DialogHeader>
        <SignupComponent setIsModalOpen={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
}
