'use client';
import React from 'react';
import { LogOut, Search } from 'lucide-react';
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
import Footer from '@/components/organism/Footer';
import Image from 'next/image';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useFetchProfil } from '@/features/Auth/query/usefetchProfil';
import { useRouter } from 'next/navigation';
import DialogTemplate from '@/components/molecule/DialogTemplate';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { deletCookies } from '@/lib/actions';
export default function userArtikelClient() {
  const router = useRouter();
  const { data: profileData } = useFetchProfil();
  const avatar = profileData?.username?.split('');
  let name;
  if (avatar) {
    name = avatar[0];
  }

  const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
  const [openDropdown, setDropdwon] = React.useState<boolean>(false);

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
    if (openDropdown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [openDropdown]);

  interface IArtikel {
    id?: number | string;
    title?: string;
    category?: string;
    [key: string]: any;
  }

  const ArtikelJson: IArtikel[] = [];

  // fetch error
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
  const handleOpen = () => {
    setOpenAddModal(!openAddModal);
  };
  const handleLogout = async (open: boolean) => {
    setOpenAddModal(open);
    await deletCookies();
    router.push('/');
  };

  //comfrime
  if (openAddModal) {
    return (
      <DialogTemplate
        className="h-[180px]"
        open={openAddModal}
        onOpenChange={handleOpen}
        title="Logout"
        desc="Are you sure want to logout?"
      >
        <DialogFooter className="flex justify-end flex-row gap-2">
          <Button
            type="button"
            variant={'outline'}
            className="font-medium cursor-pointer"
            onClick={() => setOpenAddModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleLogout}
            type="submit"
            variant={'destructive'}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogTemplate>
    );
  }
  return (
    <div className="space-y-10 relative  ">
      {openDropdown && (
        <div
          className="fixed inset-0 bg-[#0A0B0E] opacity-40 z-20 w-screen h-screen"
          onClick={() => setDropdwon(false)}
        />
      )}

      <header className="relative bg-[url('/header-user.jpg')] w-full flex items-center bg-cover bg-center flex-col ">
        <div className="absolute inset-0 bg-[#2563EBDB]"></div>
        <nav className="relative z-10 flex items-center justify-between w-full  py-4 md:py-8  px-5 md:px-[60px] bg-white md:bg-transparent ">
          <Image
            src="/iconDashboard.svg"
            width={134}
            alt="iconDasboard"
            height={24}
            className="py-1.5 hidden md:block"
            priority
          />
          <Image
            src="/iconMobail.svg"
            width={134}
            alt="iconDasboard"
            height={24}
            className="py-1.5 block md:hidden"
            priority
          />

          <div className="relative ">
            <DropdownMenu open={openDropdown} onOpenChange={setDropdwon}>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex space-x-2 items-center  relative ">
                <Avatar>
                  <AvatarFallback className="bg-[#BFDBFE] text-[#1E3A8A]">
                    {name || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-1 text-white">
                  {profileData?.username || 'admin'}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={8}
                alignOffset={-100}
                className="mt-2 rounded-md shadow-lg bg-white w-[224px] overflow-x-hidden space-y-2 "
              >
                <DropdownMenuItem
                  className="py-1.5 px-2 cursor-pointer"
                  onClick={() => router.push('/user/profile')}
                >
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-1.5 px-2 cursor-pointer flex text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut size={20} className="mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
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
      <Footer />
    </div>
  );
}
