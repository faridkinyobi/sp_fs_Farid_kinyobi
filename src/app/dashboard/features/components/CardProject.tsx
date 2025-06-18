import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CalendarDays, EllipsisVertical, Users } from 'lucide-react';
import React from 'react';
import { formattedDate } from '@/utils/Client/formatDate';

interface Props {
  name: string;
  desc?: { description?: string };
  owner: string;
  count: number;
  createdAt?: string;
  handleShowEdit: (props: any) => void;
}

export const CardProject: React.MemoExoticComponent<
  (props: Props) => React.JSX.Element
> = React.memo((props: Props) => {
  const { name, desc, owner, count, createdAt, handleShowEdit} =
    props;

  return (
    <div className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow space-y-5 cursor-pointer">
      <div className=" space-y-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold text-primary truncate">
            {name}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex space-x-2 items-center  relative ">
              <EllipsisVertical className="p-1 cursor-pointer relative h-fit hover:bg-neutral-300 rounded-sm" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              alignOffset={-100}
              className="mt-2 rounded-md shadow-lg bg-white w-[224px] overflow-x-hidden space-y-2 "
            >
              <DropdownMenuItem
                className="py-1.5 px-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowEdit(props);
                }}
              >
                Update Projext
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-muted text-sm md:text-base truncate">
          {desc?.description ?? 'not description'}
        </p>
      </div>
      <span className="text-muted text-xs md:text-sm capitalize">
        owner: {owner ?? ''}
      </span>
      <div className=" flex items-center justify-between text-sm text-gray-500  py-2">
        <span className="flex items-center gap-1">
          <Users size={20} />
          {count} members
        </span>
        <p className="flex items-center justify-end gap-1 text-right w-fit">
          <CalendarDays size={20} />
          <span className="text-muted text-xs md:text-sm  text-center py-1 ">
            Creact: {formattedDate(createdAt ?? '')}
          </span>
        </p>
      </div>
    </div>
  );
});
