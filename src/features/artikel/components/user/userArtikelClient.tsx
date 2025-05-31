'use client';
import React from 'react';
import NavUser from '@/components/organism/navUser';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SelectMolecul } from '@/components/molecule/SelectMolecul';
import CardArtikelUser from '@/components/molecule/CardArtikelUser';
import { useFetchQuery } from '../../query/useFetchQuery';
import PaginationMolecule from '@/components/molecule/Pagination';
import DataJson from '@/data/BackupData.json';
import { PeginationBackupUtils } from '@/utils/paginationBackupUtils';
import { FilterDataArikel } from '@/utils/filter';
import LoadingCardArtikel from '@/components/molecule/LoadingCardArtikel';
import { IstateTable } from '../../types/types';
import { useFetchCatagory } from '@/features/categorys/query/useFetchCatagory';
export default function userArtikelClient() {
  // state for select artikel
  const [queryParams, setQueryParams] = React.useState<IstateTable>({
    title: '',
    category: '',
    sortBy: '',
    sortOrder: '',
    page: 1,
    limit: 10,
  });
  const [backupCategory, setBackupCategory] = React.useState([]);
  //param seach
  const params = new URLSearchParams({
    title: queryParams.title ?? '',
    category: queryParams.category ?? '',
    sortBy: queryParams.sortBy ?? '',
    sortOrder: queryParams.sortOrder ?? '',
    page: String(queryParams.page),
    limit: String(queryParams.limit),
  });

  //   fetch data artikel query

  const { data, isLoading, error, isError } = useFetchQuery({
    params: params.toString(),
  });

  // localStorage handle ssr
  React.useEffect(() => {
    const payload = JSON.stringify(DataJson.artikel);
    const categoryItem = localStorage.getItem('artikel');

    // get true/kosong data.json setItem data.json
    if (!categoryItem) {
      localStorage.setItem('artikel', payload);
    } else {
      const dummyDataParse = categoryItem ? JSON.parse(categoryItem) : [];
      setBackupCategory(dummyDataParse);
    }
  }, []);

  interface IArtikel {
    id?: number | string;
    title?: string;
    category?: string;
    [key: string]: any;
  }

  const ArtikelJson: IArtikel[] = [];

  // // fetch error
  if (isError) {
    const status = (error as any)?.status;
    if (status === 404) {
      console.log(status, 'status');
      ArtikelJson.push(...backupCategory);
    }
  }
  // handle pegination  dummy data

  const { currentPage, totalPage, totalData, paginatedData } =
    PeginationBackupUtils({
      data: ArtikelJson,
      page: queryParams.page,
      limit: 10,
    });

  const dataFilter = FilterDataArikel(
    paginatedData,
    queryParams.title || '',
  ) as IArtikel[];

  const dataAtikel = data?.data || dataFilter;

  // handle page
  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: page,
    }));
  };

  // filter data  artikel
  const { data: categoryData }: { data?: { data: any[] } } = useFetchCatagory({
    page: 1,
    search: '',
  });
  const options = categoryData?.data || [];

  return (
    <div className="min-h-screen space-y-10 ">
      <header className="relative bg-[url('/header-user.jpg')] w-full flex items-center bg-cover bg-center flex-col">
        <div className="absolute inset-0 bg-[#2563EBDB]"></div>
        <NavUser />
        {/* contain */}
        <div className=" flex-col text-center max-w-[337px] md:max-w-[730px] text-white mx-6 mt-10.5 mb-[85.5px] space-y-10">
          {/* tital */}
          <div className=" relative z-10 space-y-3">
            <p className=" font-bold text-base">Blog genzet</p>
            <h1 className=" text-4xl md:text-5xl font-medium">
              The Journal : Design Resources, Interviews, and Industry News
            </h1>
            <p className="text-2xl font-normal">
              Your daily dose of design insights!
            </p>
          </div>

          {/* search */}
          <div className=" flex justify-center flex-wrap gap-2 relative z-10 bg-[#3B82F6] p-2.5 md:mx-[61px] rounded-md ">
            <SelectMolecul
              onValueChange={(value: string) => {
                // console.log('Value:', value);
                setQueryParams({ ...queryParams, category: value });
              }}
              options={options}
              defaultValue={queryParams.category}
              placeholder="Select category"
              className="w-full md:w-[180px] text-black"
              classPlaceholder="placeholder:text-[#94A3B8] placeholder:text-sm"
            />

            <div className="relative w-full md:w-[400px]">
              <Input
                value={queryParams.title}
                onChange={(e) =>
                  setQueryParams({
                    ...queryParams,
                    title: e.target.value,
                  })
                }
                placeholder="Search articles"
                className="border-[#CBD5E1] placeholder:text-[#94A3B8] text-[#18191b] placeholder:text-sm text-sm font-normal pl-10 bg-white "
              />
              <Search
                size={20}
                className=" absolute inset-2 left-3 text-[#94A3B8]"
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-5 md:mx-[100px] space-y-6">
          <p className="text-base text-[#475569]">
            Showing : 20 of 240 articles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-10 md:space-y-0 space-y-10 ">
            {isLoading ? (
              <div className="flex flex-col md:flex-row gap-0 md:gap-14 md:space-y-0 space-y-10">
                <LoadingCardArtikel />
                <LoadingCardArtikel />
                <LoadingCardArtikel />
              </div>
            ) : dataAtikel.length === 0 ? (
              <div>
                <p>No data available</p>
              </div>
            ) : (
              dataAtikel.map((items: any, index: number | string) => {
                return (
                  <div className="w-full" key={index}>
                    <CardArtikelUser props={items} />
                  </div>
                );
              })
            )}
          </div>
        </div>
        {data?.totalData || totalData >= 10 ? (
          <PaginationMolecule
            currentPage={data?.page || currentPage}
            totalPage={data?.total || totalPage}
            onPageChange={handlePageChange}
          />
        ) : (
          <div className="py-6"></div>
        )}
      </main>
    </div>
  );
}
