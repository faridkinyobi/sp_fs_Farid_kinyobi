'use client';
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SelectMolecul } from './SelectMolecul';
import { Plus, Search } from 'lucide-react';
import { IstateTable } from '@/features/artikel/types/types';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useFetchCatagory } from '@/features/categorys/query/useFetchCatagory';

interface HeaderTableProps {
  data: IstateTable;
  setData: React.Dispatch<React.SetStateAction<IstateTable>>;
  totalData?: number;
  href?: string;
  titleLink?: string;
  SelectionPlaceholder: string;
  onClick?: () => void;
  inputPlaceholder: string;
}

export function HeaderTable({
  data,
  setData,
  totalData,
  href,
  titleLink,
  SelectionPlaceholder,
  onClick,
  inputPlaceholder,
}: HeaderTableProps) {
  const pathname = usePathname();
  const titlePage = pathname.split('/').filter(Boolean).pop();
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href ?? '#');
    } else if (onClick) {
      onClick();
    }
  };
  // category data
  const { data: categoryDataData }: { data?: { data: any[] } } =
    useFetchCatagory({ page: 1, search: '' });
  const options = categoryDataData?.data || [];

  return (
    <>
      <p className=" py-6 px-6 text-foreground font-medium">
        Total <span className=" capitalize">{titlePage}</span> : {totalData}
      </p>
      <div className="py-[26px] border-t">
        <div className="flex flex-wrap items-center justify-between mx-4 md:mx-6 gap-1.5">
          <div className=" flex flex-wrap gap-2 ">
            {SelectionPlaceholder !== '' && (
              <SelectMolecul
                onValueChange={(value: string) => {
                  setData({ ...data, category: value });
                }}
                options={options}
                placeholder={SelectionPlaceholder}
                className="w-[109px]"
                classPlaceholder="placeholder:text-[#94A3B8] placeholder:text-sm"
              />
            )}
            <div className=" relative">
              <Input
                value={data.search}
                onChange={(e) => setData({ ...data, search: e.target.value })}
                placeholder={`${inputPlaceholder}`}
                className="border-[#CBD5E1] placeholder:text-[#94A3B8]  placeholder:text-sm text-sm font-normal md:w-60 pl-10"
              />
              <Search
                size={20}
                className=" absolute inset-2 left-3 text-[#94A3B8]"
              />
            </div>
          </div>
          <Button onClick={handleClick} className="gap-1.5 cursor-pointer">
            <Plus />
            Add {titleLink}
          </Button>
        </div>
      </div>
    </>
  );
}
