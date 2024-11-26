import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { InfoImage } from "./info-image";
import { Button } from "../ui/button";
import Link from "next/link";

interface IProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  link?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  footerButtonLabel?: string;
  footer?: {
    text: string;
    action: () => void;
    icon: ReactNode;
  }[];
}

export const Modal = ({
  isOpen,
  link,
  footer,
  footerButtonLabel = "Continue",
  title = "Success",
  description = "You have successfully made a bid!",
  setIsOpen,
}: IProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className='flex bg-[#111] text-white w-[95vw] flex-col items-center'>
        <InfoImage url='/svgs/success.svg' />
        <h2>{title}</h2>
        <p className='-tracking-[0.5px] text-center'>{description}</p>
        {link && (
          <Link
            href={link}
            className='text-[#666666] -tracking-[0.5px] text-center'
          >
            {description}
          </Link>
        )}

        {footer && footer.length > 0 ? (
          <footer className='flex flex-row justify-center items-center gap-2'>
            {footer.map((item, index) => (
              <Button
                onClick={item.action}
                variant={index == 0 ? "outline" : "default"}
                key={item.text}
                size='sm'
                className='flex flex-row gap-1'
              >
                {index === 0 && item.icon}
                {item.text}
                {index === 1 && item.icon}
              </Button>
            ))}
          </footer>
        ) : (
          <Button
            className='flex flex-row gap-1'
            size='sm'
            onClick={() => setIsOpen(false)}
          >
            {footerButtonLabel}
            <InfoImage width={16} height={16} url='/svgs/arrow-svg.svg' />
          </Button>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
