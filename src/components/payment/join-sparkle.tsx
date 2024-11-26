import Image from "next/image";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

export const JoinSparkle = () => {
  return (
    <div className='w-full flex  gap-4 items-center  flex-col'>
      <p className='font-semibold '>Join the Sparkle Tribe</p>
      <div className='flex gap-4 flex-row items-center justify-center'>
        <Link
          href='https://apps.apple.com/ng/app/sparkle-a-lifestyle-bank/id1475491602'
          className='w-[146px] h-[48px] relative'
        >
          <Image fill alt='App Store Image' src='/payment/apple-store.svg' />
        </Link>
        <Link
          href='https://play.google.com/store/apps/details?id=ng.sparkle.Sparkle_android.prod&hl=en'
          className='w-[146px] h-[48px] relative'
        >
          <Image
            fill
            alt='Google Play Store Store Image'
            src='/payment/google-play.svg'
          />
        </Link>
      </div>
      <p className='font-semibold '>Follow us on</p>
      <div className='flex flex-row items-center justify-center gap-[10px]'>
        {[
          {
            Icon: AiFillInstagram,
            url: "https://www.instagram.com/sparklenigeria/?hl=en",
          },
          {
            Icon: AiFillFacebook,
            url: "https://www.facebook.com/sparkleplaceng/",
          },
          {
            Icon: AiFillTwitterCircle,
            url: "https://x.com/sparkle_nigeria",
          },
          {
            Icon: AiFillLinkedin,
            url: "https://www.linkedin.com/company/sparklenigeria/?originalSubdomain=ng",
          },
        ].map((item, index) => (
          <a
            href={item.url}
            className='bg-[#151314] rounded-[8px] grid place-content-center w-10 h-10 p-[10px]'
            key={index}
          >
            <item.Icon size={30} color='white' />
          </a>
        ))}
      </div>
    </div>
  );
};
