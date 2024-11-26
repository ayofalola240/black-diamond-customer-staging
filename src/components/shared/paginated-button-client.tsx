import React, { Dispatch, SetStateAction } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface IProps {
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export const PaginatedButtonsClient = ({
  currentPage,
  totalPages,
  setPage,
}: IProps) => {
  const updateSearchParams = (type: "next" | "prev") => {
    setPage((prev) => (type == "next" ? prev + 1 : prev - 1));
  };

  const disabledPrevButton = currentPage === 1;
  const disabledNextBUtton = currentPage === totalPages;

  return (
    <div className='flex flex-row mt-4  gap-4 items-center justify-end'>
      <Button
        onClick={() => updateSearchParams("prev")}
        disabled={disabledPrevButton}
        size='sm'
      >
        <ArrowLeft />
        <span>Prev</span>
      </Button>
      <Button
        onClick={() => updateSearchParams("next")}
        disabled={disabledNextBUtton}
        size='sm'
      >
        <span>Next</span>
        <ArrowRight />
      </Button>
    </div>
  );
};
