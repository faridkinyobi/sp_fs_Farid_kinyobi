'use client';
import { Button } from '@/components/ui/button';
import { useFetchProfil } from '@/features/Auth/query/usefetchProfil';
import { useRouter } from 'next/navigation';

import React from 'react';

export default function page() {
  const router = useRouter();
  const { data } = useFetchProfil();
  const avatar = data?.username?.split('');
  let name;
  if (avatar) {
    name = avatar[0];
  }

  return (
    <div className=" bg-secondary flex justify-center h-screen">
      <div className="flex flex-col items-center py-1.5">
        <div className="py-6 px-4 w-[400px] h-[436px]  space-y-9 ">
          <h1 className="text-center">User Profil</h1>
          <div className=" space-y-6 flex flex-col items-center">
            <div className=" w-16 h-16 text-center flex items-center justify-center bg-[#BFDBFE] text-[#1E3A8A] text-2xl rounded-full">
              {name}
            </div>
            <div className="w-full">
              <ul className="mt-4 space-y-2  w-full">
                <li className=" border border-ring bg-background py-3 w-full flex justify-between px-3 rounded-md">
                  <div className="w-[96px] flex justify-between">
                    Username <span>:</span>
                  </div>
                  <span className="text-center mx-auto"> {data?.username}</span>
                </li>
                <li className="border border-ring bg-background py-3 w-full flex justify-between px-3  rounded-md">
                  <div className="w-[96px] flex justify-between">
                    Password <span>:</span>
                  </div>
                  <span className="text-center mx-auto"> 1234567890</span>
                </li>
                <li className=" border border-ring bg-background py-3 w-full flex justify-between px-3  rounded-md">
                  <div className="w-[96px] flex justify-between">
                    Role<span>:</span>
                  </div>{' '}
                  <span className="text-center mx-auto">{data?.role}</span>
                </li>
              </ul>
            </div>
          </div>

          <Button
            onClick={() => router.push('/dashboard/artikel')}
            className="w-full cursor-pointer"
          >
            Back to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
