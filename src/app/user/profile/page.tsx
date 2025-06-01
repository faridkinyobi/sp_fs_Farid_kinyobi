'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useFetchProfil } from '@/features/Auth/query/usefetchProfil';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/organism/Footer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import DialogTemplate from '@/components/molecule/DialogTemplate';
import { DialogFooter } from '@/components/ui/dialog';
import { deletCookies } from '@/lib/actions';
import { LogOut } from 'lucide-react';

export default function page() {
  const router = useRouter();

  const { data } = useFetchProfil();

  const avatar = data?.username?.split('');
  let name;
  if (avatar) {
    name = avatar[0];
  }
  const [openDropdown, setDropdwon] = React.useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
  const handleModal = () => {
    setOpenAddModal(!openAddModal);
  };
  const handleLogout = async () => {
    // await deletCookies();
    // router.push('/');
    setOpenAddModal(!openAddModal);
  };
  if (openAddModal) {
    return (
      <DialogTemplate
        className="h-[180px]"
        open={openAddModal}
        onOpenChange={handleModal}
        title="Logout"
        desc={`Are you sure want to logout?`}
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
    <div className=" bg-secondary overflow-hidden ">
      {openDropdown && (
        <div
          className="fixed inset-0 bg-[#0A0B0E] opacity-40 z-20 w-screen h-screen"
          onClick={() => setDropdwon(false)}
        />
      )}

      <header>
        <nav className="relative z-10 flex items-center justify-between w-full  py-4 md:py-8  px-5 md:px-[60px] bg-white md:bg-transparent ">
          <Image
            src="/iconMobail.svg"
            width={134}
            alt="iconDasboard"
            height={24}
            className="py-1.5"
            priority
          />
          <div>
            <DropdownMenu open={openDropdown} onOpenChange={setDropdwon}>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex space-x-2 items-center  z-50 relative ">
                <Avatar>
                  <AvatarFallback className="bg-[#BFDBFE] text-[#1E3A8A]">
                    {name || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-1 text-white">
                  {data?.username || 'admin'}
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
      </header>
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
                    <span className="text-center mx-auto">
                      {' '}
                      {data?.username}
                    </span>
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
              onClick={() => router.back()}
              className="w-full cursor-pointer"
            >
              Back to dashboard
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
