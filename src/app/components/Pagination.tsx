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
      <button disabled={currentPage <= 1}>
        <Link
          className={currentPage <= 1 ? "pointer-events-none" : ""}
          href={createPageURL(currentPage - 1)}
          aria-disabled={currentPage <= 1}
        >
          <GoTriangleLeft
            className={`text-neutral-600 dark:text-neutral-400 ${
              currentPage <= 1 && "opacity-40"
            }`}
            size={36}
          />
        </Link>
      </button>
      <button disabled={currentPage <= 1}>
        <Link
          className={currentPage <= 1 ? "pointer-events-none" : ""}
          href={currentPage >= 2 ? createPageURL(1) : pathname}
          aria-disabled={currentPage <= 1}
        >
          <MdKeyboardDoubleArrowLeft
            className={`text-neutral-600 dark:text-neutral-400 ${
              currentPage <= 1 && "opacity-40"
            }`}
            size={36}
          />
        </Link>
      </button>
      <button>
        <Link className='btn-pagination' href={createPageURL(currentPage - 2)}>
          {currentPage}
        </Link>
      </button>
      <button>
        <Link className='btn-pagination' href={createPageURL(currentPage - 1)}>
          {currentPage + 1}
        </Link>
      </button>
      <button>
        <Link className='btn-pagination' href={createPageURL(currentPage)}>
          {currentPage + 2}
        </Link>
      </button>
      <button disabled={currentPage >= totalPages}>
        <Link
          className={currentPage >= totalPages ? "pointer-events-none" : ""}
          href={createPageURL(totalPages)}
          type='button'
          aria-disabled={currentPage >= totalPages}
        >
          <MdKeyboardDoubleArrowRight
            className={`text-neutral-600 dark:text-neutral-400 ${
              currentPage === totalPages && "opacity-40"
            }`}
            size={36}
          />
        </Link>
      </button>
      <button disabled={currentPage >= totalPages}>
        <Link
          className={currentPage >= totalPages ? "pointer-events-none" : ""}
          href={createPageURL(currentPage + 1)}
          type='button'
          aria-disabled={currentPage >= totalPages}
        >
          <GoTriangleRight
            className={`text-neutral-600 dark:text-neutral-400 ${
              currentPage === totalPages && "opacity-40"
            }`}
            size={36}
          />
        </Link>
      </button>
    </div>
  );
};

export default Pagination;
