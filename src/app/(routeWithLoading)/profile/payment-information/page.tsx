import {
  CurrentPayment,
  PastPayment,
  UpcomingPayment,
} from "@/components/payment-information";

export default function PaymentInformation() {
  return (
    <section className='max-w-[720px] text-white flex flex-col gap-8 h-full'>
      <UpcomingPayment />
      <CurrentPayment />
      <PastPayment />
    </section>
  );
}
