'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { IArtikel, IstateTable } from '../types/types';
import Image from 'next/image';
import { FormatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { HeaderTable } from '@/components/molecule/HeaderTable';
import { useFetchQuery } from '../query/useFetchQuery';
import PeginationMolecu from '@/components/molecule/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { artikel } from '@/data/BackupData.json';
import { useDeletArtikel } from '../query/useDeletArtikel';
import { Button } from '@/components/ui/button';
import ArtikelComfirmDelet from './ArtikelComfirmDelet';
import { useFetchCatagory } from '@/features/categorys/query/useFetchCatagory';

export default function ArtikelTableClient() {
  // state for select artikel
  const [queryParams, setQueryParams] = React.useState<IstateTable>({
    title: '',
    category: '',
    sortBy: '',
    sortOrder: '',
    page: 1,
    limit: 10,
  });

  // param Url search
  const params = new URLSearchParams({
    title: queryParams.title ?? '',
    category: queryParams.category ?? '',
    sortBy: queryParams.sortBy ?? '',
    sortOrder: queryParams.sortOrder ?? '',
    page: String(queryParams.page),
    limit: String(queryParams.limit),
  });

  const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
  const [idArtikel, setIdArtikel] = React.useState<string | null>(null);
  //   fetch data artikel query
  const {
    data,
    isLoading,
    error,
    isError,
    refetch: refraseArtikel,
  } = useFetchQuery({
    params: params.toString(),
  });

  const jsonArtikel: IArtikel[] = [];

  if (isError) {
    const status = (error as any)?.status;

    if (status === 404) {
      jsonArtikel.push(...artikel);
    }
  }

  const datass = data?.data || jsonArtikel;

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const { mutate } = useDeletArtikel({
    onSuccess: () => {
      refraseArtikel();
    },
  });

  const handleDelet = (id: string, open: boolean) => {
    setOpenAddModal(open);
    setIdArtikel(id);
  };
  const handleOpenAddModal = (open: boolean) => {
    setOpenAddModal(open);
  };

  const handleSuksesModelComfrime = () => {
    setOpenAddModal(!openAddModal);
    if (idArtikel) {
      mutate(idArtikel);
    }
  };

  return (
    <div className=" border bg-secondary rounded-2xl">
      {openAddModal && (
        <ArtikelComfirmDelet
          open={openAddModal}
          onOpenChange={handleOpenAddModal}
          handleSuksesModelComfrime={handleSuksesModelComfrime}
        />
      )}
      <HeaderTable
        data={queryParams}
        setData={setQueryParams}
        totalData={data?.total}
        titleLink="artikel"
        inputPlaceholder="Search by title"
        SelectionPlaceholder="Category"
        href="/dashboard/artikel/create"
      />
      <Table className=" items-center">
        <TableHeader>
          <TableRow className="bg-background text-center">
            <TableHead className="text-center w-[225px]">Thumbnails</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Catagory</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <SkeletonTableRow colSpan={5} />
          ) : datass.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                <p className="text-muted-foreground">No data available</p>
              </TableCell>
            </TableRow>
          ) : (
            datass.map((articles: IArtikel, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium flex justify-center min-w-[225px] my-3">
                  <Image
                    src={articles.imageUrl || '/placeholder-image.webp'}
                    alt={`Thumbnail for ${index}`}
                    width={60}
                    height={60}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/placeholder-image.webp';
                    }}
                    unoptimized
                    className="rounded-md w-[60px] h-[60px] object-cover"
                    priority
                  />
                </TableCell>
                <TableCell className="w-[225px] px-4">
                  <span className=" whitespace-normal ">{articles.title}</span>
                </TableCell>
                <TableCell className="text-center">
                  {articles.category.name}
                </TableCell>
                <TableCell className="text-center">
                  {FormatDate(articles.createdAt)}
                </TableCell>
                <TableCell className=" space-x-3 text-center">
                  <Link
                    href={`/preview/${articles.id}`}
                    className=" underline text-[#2563EB]"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/dashboard/artikel/edits/${articles.id}`}
                    className=" underline text-[#2563EB]"
                  >
                    edit
                  </Link>
                  <Button
                    variant={'link'}
                    onClick={() => handleDelet(articles.id, !openAddModal)}
                    size={'sm'}
                    className="underline text-destructive w-10 cursor-pointer"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <PeginationMolecu
        currentPage={data?.page}
        totalPage={data?.total}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function SkeletonTableRow({ colSpan }: { colSpan: number }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-4">
        <div className="animate-pulse flex justify-center space-x-4">
          <Skeleton className="rounded-md h-16 w-16 mx-20" />
          <div className="flex-1 space-y-3 py-1">
            <div className=" justify-between flex">
              <Skeleton className="rounded h-4 w-28 mx-1" />
              <Skeleton className="rounded h-4 w-28 mx-1" />
              <Skeleton className="rounded h-4 w-28 mx-1" />
              <Skeleton className="rounded h-4 w-28 mx-1" />
            </div>
            <div className=" justify-between flex">
              <Skeleton className="rounde-md h-4 w-28 mx-1" />
              <Skeleton className="rounded-md h-4 w-28 mx-1" />
              <Skeleton className="rounded-md h-4 w-28 mx-1" />
              <Skeleton className="rounded-md h-4 w-28 mx-1" />
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
