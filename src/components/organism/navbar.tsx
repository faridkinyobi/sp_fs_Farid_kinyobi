'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useFetchProfil } from '@/features/Auth/query/usefetchProfil';
export function AppNavbar() {
  const router = useRouter();

  const pathname = usePathname();
  const titlePage = pathname.split('/').filter(Boolean).pop();
  // profil
  const { data } = useFetchProfil();
  const avatar = data?.username?.split('');
  let name;
  if (avatar) {
    name = avatar[0];
  }
  const titlePageEdit = pathname.split('/').filter(Boolean)[1];
  const title = titlePageEdit === 'edit' ? titlePage : titlePageEdit;

  return (
    <div className="ml-0 bg-secondary h-[68px] flex items-center border-border border-b">
      <div className="w-full flex justify-between  mx-6">
        <SidebarTrigger className=" border-0 bg-transparent">
          <h1 className=" capitalize font-semibold text-xl text-secondary-foreground cursor-pointer border-0">
            {title === 'profile' ? 'User Profil' : title}
          </h1>
        </SidebarTrigger>

        <div className="flex items-center -space-x-1 underline">
          <Avatar>
            <AvatarFallback className="bg-[#BFDBFE] text-[#1E3A8A]">
              {name || 'U'}
            </AvatarFallback>
          </Avatar>
          <Button
            onClick={() => router.push('/dashboard/profile')}
            variant="link"
            className="hover:no-underline cursor-pointer"
          >
            {data?.username || 'Admin'}
          </Button>
        </div>
      </div>
    </div>
  );
}
