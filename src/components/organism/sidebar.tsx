'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

import Image from 'next/image';
import Link from 'next/link';
import { Newspaper, Tag, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import DialogTemplate from '../molecule/DialogTemplate';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import React from 'react';
import { deletCookies } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useFetchCatagory } from '@/features/categorys/query/useFetchCatagory';
const menuItems = [
  {
    href: '/dashboard/artikel',
    label: 'Artikel',
    icon: <Newspaper size={20} />,
  },
  { href: '/dashboard/category', label: 'Category', icon: <Tag size={20} /> },
  { href: '/Login', label: 'Logout', icon: <LogOut size={20} /> },
];
export function AppSidebar() {
  const pathname = usePathname();
  const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
  const router = useRouter();
  // logout catagory open
  const handleLogoutOpen = (open: boolean) => {
    setOpenAddModal(open);
  };

  //   comfrim model ok delet close
  const handleCloseModelComfrime = async () => {
    await deletCookies();
    router.push('/');
    setOpenAddModal(!openAddModal);
    window.location.reload();
  };

  return (
    <Sidebar className="w-[267px] ">
      {openAddModal && (
        <DialogDelet
          open={openAddModal}
          onOpenChange={handleLogoutOpen}
          handleCloseModelComfrime={handleCloseModelComfrime}
        />
      )}
      <SidebarHeader className=" py-6 px-8">
        <Image
          src="/iconDashboard.svg"
          width={134}
          alt="iconDasboard"
          height={24}
          className="py-1.5 "
          priority
        />
      </SidebarHeader>
      <SidebarContent className="mx-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuButton
              key={item.href}
              asChild
              className={cn(
                pathname === item.href
                  ? ' bg-sidebar-accent '
                  : ' hover:bg-transparent ',
              )}
            >
              <Link
                href={item.label === 'Logout' ? pathname : item.href}
                onClick={(e) => {
                  if (item.label === 'Logout') {
                    handleLogoutOpen(!openAddModal);
                  }
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export type DialogProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  handleCloseModelComfrime?: () => void;
};
const DialogDelet = ({
  onOpenChange,
  open,
  handleCloseModelComfrime,
}: DialogProps) => {
  return (
    <DialogTemplate
      className="h-[180px]"
      open={open}
      onOpenChange={onOpenChange}
      title="Logout"
      desc={'Are you sure want to logout?'}
    >
      <DialogFooter className="flex justify-end flex-row gap-2">
        <Button
          type="button"
          variant={'outline'}
          className=" font-medium"
          onClick={() => onOpenChange(!open)}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCloseModelComfrime}
          type="submit"
          variant={'destructive'}
        >
          Logout
        </Button>
      </DialogFooter>
    </DialogTemplate>
  );
};
