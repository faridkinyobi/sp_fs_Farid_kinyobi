'use client';

import { ProviderContext } from '@/context/ThemeContext';
import { useDraggable } from '@dnd-kit/core';
import React, { useCallback } from 'react';
import { DialogTaskDelet, DialogTaskModal } from './DialogTask';
import { EllipsisVertical } from 'lucide-react';
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FormatDate } from '@/utils/Client/formatDate';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  title: string;
  description?: string;
  id: string | number;
  column: string | number;
  updatedAt?: string | number;
  DataEmail: {
    email: string;
    name: string;
  };
  onEdit: (props: any) => void;
  onDelet: (props: any) => void;
}
export default React.memo(function TaskCard(props: Props) {
  const {
    title,
    description,
    id,
    column,
    updatedAt,
    DataEmail,
    onEdit,
    onDelet,
  } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : {};
  const [showDropdown, setShowDropdown] = React.useState(false);

  // context
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { open } = context;

  React.useEffect(() => {
    if (open.task) {
      setShowDropdown(false);
    }
  }, [open.task]);

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <article
        aria-label="Task: Create wireframes "
        className={` rounded-md p-4 shadow transition space-y-10 ${
          column === 'todo'
            ? 'bg-indigo-50 hover:bg-indigo-100'
            : column !== 'done'
              ? 'bg-amber-50 hover:bg-amber-100'
              : 'bg-green-50 hover:bg-green-100'
        } `}
      >
        <div className="space-y-1">
          <div className="flex flex-row justify-between">
            <h3 className="font-semibold text-lg text-indigo-900 mb-1 truncate capitalize">
              {title}
            </h3>
            <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
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
                  onMouseDown={() => onEdit(props)}
                >
                  Update task
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant={'destructive'}
                  className="py-1.5 px-2 cursor-pointer flex"
                  onMouseDown={() => onDelet(props)}
                >
                  Delete task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-secondary-foreground text-sm md:text-base truncate">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-auto items-center">
          <div className="flex items-center space-x-1 ">
            <Avatar>
              <AvatarImage
                height="24"
                width="24"
                src="https://storage.googleapis.com/a1aa/image/a8b84924-b803-4186-0111-8f9225f119c0.jpg"
                alt="Avatar of John Doe, assignee"
              />

              <AvatarFallback className="bg-[#BFDBFE] text-[#1E3A8A]">
                {DataEmail.name}
              </AvatarFallback>
            </Avatar>

            <span className="text-indigo-900 text-sm truncate">
              {DataEmail.email}
            </span>
          </div>
          <p className=" text-indigo-900 text-right w-24 text-sm ">
            {updatedAt ? FormatDate(String(updatedAt)) : ''}
          </p>
        </div>
      </article>
    </div>
  );
});
