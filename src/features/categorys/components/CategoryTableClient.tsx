'use client';
import React, { useContext } from 'react';
import { HeaderTable } from '@/components/molecule/HeaderTable';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FormatDate } from '@/utils/formatDate';
import { useFetchCatagory } from '@/features/categorys/query/useFetchCatagory';
import {
  Icategory,
  IstateTableCatagory,
} from '@/features/categorys/types/types';
import PeginationMolecul from '@/components/molecule/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import DialogCatagory from './DialogCatagory';
import { Button } from '@/components/ui/button';
import category from '@/data/BackupData.json';
import { ProviderContext } from '@/context/ThemeContext';
import CatagoryComfirmDelet from './CategoryConfirmDelet';
import { useDeletCatagory } from '../query/useDeletCatagory';
import { PeginationBackupUtils } from '@/utils/paginationBackupUtils';
import { FilterData } from '@/utils/filter';

export default function CategoryTableClient() {
  const [dataCategory, setDataCategory] = React.useState<IstateTableCatagory>({
    page: 1,
    limit: 10,
    search: '',
    select: '',
  });

  const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
  const [deletId, setDeletId] = React.useState<boolean>(false);
  const [backupCategory, setBackupCategory] = React.useState<Icategory[]>([]);

  // Context
  const context = useContext(ProviderContext);
  if (!context) return null;
  const { setIdCatagory, idCatagory } = context;

  // Fetch Category
  const {
    data,
    isLoading,
    error,
    isError,
    refetch: refetchCatagory,
  } = useFetchCatagory({
    page: dataCategory.page,
    search: dataCategory.search || '',
  });

  // localStorage handle ssr
  React.useEffect(() => {
    const payload = JSON.stringify(category.category);
    const categoryItem = localStorage.getItem('category');

    // get true/kosong data.json setItem data.json
    if (!categoryItem) {
      localStorage.setItem('category', payload);
    } else {
      const dummyDataParse = categoryItem ? JSON.parse(categoryItem) : [];
      setBackupCategory(dummyDataParse);
    }
  }, []);

  interface ICategoryJson extends Icategory {}

  const CategoryJson: ICategoryJson[] = [];

  // fetch error
  if (isError) {
    const status = (error as any)?.status;
    if (status === 404) {
      CategoryJson.push(...backupCategory);
    }
  }

  // handle pagination dummy data
  const { currentPage, totalPage, totalData, paginatedData } =
    PeginationBackupUtils({
      data: CategoryJson,
      page: dataCategory.page,
      limit: 10,
    });

  // data fetch / dummy data Pegination
  const datasCatagory = data?.data || paginatedData;

  //useMutation query delet catagory
  const { mutate } = useDeletCatagory({
    onSuccess: () => {
      if (!openAddModal) {
        refetchCatagory();
      }
    },
  });

  // handle data change page,serch,select
  const handlePageChange = (page: number) => {
    setDataCategory((prev) => ({
      ...prev,
      page: page,
    }));
  };

  // filter data catagory
  const dataFilter = FilterData(
    datasCatagory,
    dataCategory.search || '',
  ) as Icategory[];

  //   open modal
  const handleOpenAddModal = (open: boolean) => {
    setOpenAddModal(open);
    if (!open) {
      setDeletId(false);
      setIdCatagory({ id: '', name: '' });
    }
  };

  //   open edit
  const handleEditModal = (
    open: boolean,
    data?: { id?: string; name: string },
  ) => {
    if (open) {
      if (data && typeof data.id === 'string') {
        setOpenAddModal(open);
        setIdCatagory({ id: data.id, name: data.name });
        setDeletId(false);
      } else {
        setDeletId(false);
        setIdCatagory(undefined);
      }
    }
  };

  // delet catagory open
  const handleDeletCatagory = (data?: { id?: string; name: string }) => {
    if (data && typeof data.id === 'string') {
      setOpenAddModal(true);
      setDeletId(true);
      setIdCatagory({ id: data.id, name: data.name });
    }
  };

  //   comfrim model ok delet close
  const handleCloseModelComfrime = () => {
    if (idCatagory) {
      mutate({ id: idCatagory?.id });
      const removeData = backupCategory.filter(
        (items: any) => items.id !== idCatagory.id,
      );
      if (removeData) {
        localStorage.setItem('category', JSON.stringify(removeData));
        window.location.reload();
      }
      setOpenAddModal(!openAddModal);
      setDeletId(false);
      setIdCatagory({ id: '', name: '' });
    }
  };

  return (
    <div className=" border bg-secondary rounded-2xl">
      {openAddModal && !deletId && (
        <DialogCatagory open={openAddModal} onOpenChange={handleOpenAddModal} />
      )}

      {openAddModal && deletId && (
        <CatagoryComfirmDelet
          open={openAddModal}
          onOpenChange={handleOpenAddModal}
          handleCloseModelComfrime={handleCloseModelComfrime}
        />
      )}

      <HeaderTable
        data={dataCategory}
        setData={setDataCategory}
        totalData={data?.totalData || backupCategory.length}
        onClick={() => handleOpenAddModal(true)}
        SelectionPlaceholder=""
        inputPlaceholder="Search Category"
        titleLink="Category"
      />
      <Table className="items-center">
        <TableHeader>
          <TableRow className="bg-background text-center">
            <TableHead>Category</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <SkeletonTableRow colSpan={3} />
          ) : dataFilter.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            dataFilter?.map((articles: Icategory, index: number) => (
              <TableRow key={index}>
                <TableCell className="text-center">{articles.name}</TableCell>
                <TableCell className="text-center">
                  {FormatDate(articles.createdAt)}
                </TableCell>
                <TableCell className="text-center space-x-3">
                  <Button
                    variant={'link'}
                    size={'sm'}
                    onClick={() => handleEditModal(!openAddModal, articles)}
                    className=" underline text-[#2563EB] cursor-pointer  px-0 py-0"
                  >
                    Edit
                  </Button>
                  <Button
                    size={'sm'}
                    variant={'link'}
                    onClick={() => handleDeletCatagory(articles)}
                    className=" underline text-destructive  cursor-pointer px-0 py-0"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {data?.totalData || totalData >= 10 ? (
        <PeginationMolecul
          currentPage={data?.currentPage || currentPage}
          totalPage={data?.totalPages || totalPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className="py-6"></div>
      )}
    </div>
  );
}

function SkeletonTableRow({ colSpan }: { colSpan: number }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-4">
        <div className="flex-1 space-y-3 py-1">
          <div className=" justify-between flex">
            <Skeleton className="rounded h-4 w-full mx-10" />
            <Skeleton className="rounded h-4 w-full mx-10" />
            <Skeleton className="rounded h-4 w-full mx-10" />
          </div>
          <div className=" justify-between flex">
            <Skeleton className="rounded h-4 w-full mx-10" />
            <Skeleton className="rounded h-4 w-full mx-10" />
            <Skeleton className="rounded h-4 w-full mx-10" />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
