export const HeaderComponent = ({
  header,
  desc,
}: {
  header: string;
  desc: string;
}) => {
  return (
    <header className='text-[#121312]'>
      <p className='font-semibold text-lg sm:text-xl'>{header}</p>
      <p>{desc}</p>
    </header>
  );
};
