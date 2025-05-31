import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { TypePropsPegination } from '@/features/artikel/types/types';

export default function PaginationMolecule({
  currentPage,
  totalPage,
  onPageChange,
}: TypePropsPegination) {
  const [pages, setPages] = React.useState<(number | string)[]>([]);

  React.useEffect(() => {
    const pageNumber: (number | string)[] = [];

    if (currentPage <= 2) {
      pageNumber.push(1, 2, '...');
      // for (let i = 1; i <= totalPage; i++) {
      //   pageNumber.push(i);
      // }
    } else {
      if (currentPage > 6) pageNumber.push(1, 2, 3, '...');

      for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(totalPage, currentPage + 1);
        i++
      ) {
        pageNumber.push(i);
      }
      if (currentPage < totalPage - 2) pageNumber.push('...', totalPage);
    }

    setPages(pageNumber);
  }, [currentPage, totalPage]);

  const handlePrevious = () => {
    return currentPage > 1 && onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    return currentPage <= totalPage && onPageChange(currentPage + 1);
  };
  return (
    <Pagination className=" py-6   ">
      <PaginationContent className=" flex justify-center w-full mx-4">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            onClick={() => handlePrevious()}
          />
        </PaginationItem>
        {pages.map((items, index) => (
          <PaginationItem key={index}>
            {typeof items === 'string' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={items === currentPage}
                onClick={() => typeof items === 'number' && onPageChange(items)}
                className={`${items === currentPage ? 'bg-white ' : ' '} `}
                aria-disabled={typeof items === 'string' ? true : false}
              >
                {items}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href="#" onClick={() => handleNext()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
