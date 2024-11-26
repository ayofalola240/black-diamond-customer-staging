import { TInitiatePayment } from "@/types";
import { create } from "zustand";

interface PaymentState {
  paymentDetails: TInitiatePayment;
  setPayment: (arg: TInitiatePayment) => void;
}

export const usePayment = create<PaymentState>()((set) => ({
  paymentDetails: {} as TInitiatePayment,
  setPayment: (arg) => set(() => ({ paymentDetails: arg })),
}));
