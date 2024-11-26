"use client";

import { LoginComponent } from "@/components/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useRouter } from "nextjs-toploader/app";

export default function LoginModal() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className='sm:max-w-[532px]'>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <button onClick={() => router.back()}>
            <IoIosCloseCircle size={24} />
          </button>
        </DialogHeader>
        <LoginComponent setIsModalOpen={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
}
