import { Footer, Nav } from "@/components/shared";

export default function GroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-svh flex flex-col'>
      <Nav />
      <section className='flex-grow flex'>{children}</section>
      <Footer />
    </main>
  );
}
