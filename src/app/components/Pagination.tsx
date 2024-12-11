"use client";

import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number | undefined }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return <div>Pagination</div>;
};

export default Pagination;
