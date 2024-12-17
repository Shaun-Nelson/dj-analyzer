"use client";

import Link from "next/link";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex justify-center items-center gap-2 py-12'>
      <Link
        href={createPageURL(currentPage - 1)}
        type='button'
        aria-disabled={currentPage === 1}
      >
        <GoTriangleLeft
          className={`text-neutral-600 dark:text-neutral-400 ${
            currentPage === 1 && "opacity-40"
          }`}
          size={36}
        />
      </Link>
      <Link
        href={createPageURL(1)}
        type='button'
        aria-disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft
          className={`text-neutral-600 dark:text-neutral-400 ${
            currentPage === 1 && "opacity-40"
          }`}
          size={36}
        />
      </Link>
      <Link
        className='btn-pagination'
        href={createPageURL(currentPage - 2)}
        type='button'
      >
        {currentPage}
      </Link>
      <Link
        className='btn-pagination'
        href={createPageURL(currentPage - 1)}
        type='button'
      >
        {currentPage + 1}
      </Link>
      <Link
        className='btn-pagination'
        href={createPageURL(currentPage)}
        type='button'
      >
        {currentPage + 2}
      </Link>
      <Link
        href={createPageURL(totalPages)}
        type='button'
        aria-disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight
          className={`text-neutral-600 dark:text-neutral-400 ${
            currentPage === totalPages && "opacity-40"
          }`}
          size={36}
        />
      </Link>
      <Link
        href={createPageURL(currentPage + 1)}
        type='button'
        aria-disabled={currentPage === totalPages}
      >
        <GoTriangleRight
          className={`text-neutral-600 dark:text-neutral-400 ${
            currentPage === totalPages && "opacity-40"
          }`}
          size={36}
        />
      </Link>
    </div>
  );
};

export default Pagination;
