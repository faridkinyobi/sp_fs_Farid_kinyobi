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
import { LayoutDashboard, LogOut, FolderKanban } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import DialogTemplate from '../molecule/DialogTemplate';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import React from 'react';
import { deletCookies } from '@/lib/cookies';
import { useRouter } from 'next/navigation';
import { ProviderContext } from '@/context/ThemeContext';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  // { href: '/projects', label: 'Projects', icon: <FolderKanban size={20} /> },
  { href: '/Login', label: 'Logout', icon: <LogOut size={20} /> },
];

export function AppSidebar() {
  const pathname = usePathname();

  const router = useRouter();
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { open, setOpen } = context;

  //   comfrim model ok delet close
  const handleCloseModelComfrime = async () => {
    await deletCookies();
    router.push('/');
    setOpen({ ...open, logout: !open.logout });
  };
  const handleOpen = () => setOpen({ ...open, logout: !open.logout });
  return (
    <Sidebar className="w-[267px] ">
      {open.logout && (
        <DialogDelet handleCloseModelComfrime={handleCloseModelComfrime} />
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
              <button onClick={handleOpen}>
                {item.icon}
                {item.label}
              </button>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export type DialogProps = {
  handleCloseModelComfrime?: () => void;
};
const DialogDelet = ({ handleCloseModelComfrime }: DialogProps) => {
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { open, setOpen } = context;
  const handleOpen = () => setOpen({ ...open, logout: !open.logout });
  return (
    <DialogTemplate
      open={open.logout}
      onOpenChange={() => handleOpen()}
      className="h-[180px] w-[400px]"
      title="Logout"
      desc={'Are you sure want to logout?'}
    >
      <DialogFooter className="flex justify-end flex-row gap-2">
        <Button
          type="button"
          variant={'outline'}
          className=" cursor-pointer"
          onClick={() => handleOpen()}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleCloseModelComfrime && handleCloseModelComfrime()}
          type="submit"
          className="cursor-pointer"
          variant={'destructive'}
        >
          Logout
        </Button>
      </DialogFooter>
    </DialogTemplate>
  );
};
