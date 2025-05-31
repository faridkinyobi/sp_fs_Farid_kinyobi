'use client';
import { useFetchProfil } from '@/features/Auth/query/usefetchProfil';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '../ui/button';

export default function navUser() {
  const router = useRouter();

  const { data } = useFetchProfil();
  const avatar = data?.username?.split('');
  let name;
  if (avatar) {
    name = avatar[0];
  }
  return (
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
      <div className="flex items-center underline">
        <Avatar>
          <AvatarFallback className="bg-[#BFDBFE] text-[#1E3A8A] ">
            {name || 'U'}
          </AvatarFallback>
        </Avatar>
        <Button
          onClick={() => router.push('/dashboard/profile')}
          variant="link"
          className="hover:no-underline cursor-pointer hidden md:block text-white"
        >
          {data?.username}
        </Button>
      </div>
    </nav>
  );
}
