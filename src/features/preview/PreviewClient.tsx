'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useFetchProfil } from '../Auth/query/usefetchProfil';
import Image from 'next/image';
import { useFetchPreview } from './query/useFetchPreview';
// import parse from 'html-react-parser';
import { formattedDate } from '@/utils/formatDate';
import HTMLContent from '@/utils/HTMLContent';
import { useFetchQuery } from '../artikel/query/useFetchQuery';
import CardArtikelUser from '@/components/molecule/CardArtikelUser';
export default function PreviewClient({ slug }: { slug: string }) {
  const router = useRouter();

  const { data } = useFetchProfil();
  const avatar = data?.username?.split('');
  let name;
  if (avatar) {
    name = avatar[0];
  }
  const { data: dataById } = useFetchPreview(slug);
  const { data: Artikel } = useFetchQuery({
    page: 1,
    search: '',
  });

  const artikelOther = (Artikel?.data || [])
    .filter((item: any) => item.category.name === dataById.category.name)
    .slice(0, 3);
    
  // console.log(data);
  return (
    <div>
      <header>
        <nav className="relative z-10 flex items-center justify-between w-full  py-4 md:py-9  px-5 md:px-[60px] bg-white md:bg-transparent border-b border-b-border ">
          <Image
            src="/iconMobail.svg"
            width={134}
            alt="iconDasboard"
            height={24}
            className="py-1.5 "
            priority
          />
          <div className="flex items-center underline">
            <Avatar>
              <AvatarFallback className="bg-[#BFDBFE] text-[#1E3A8A] ">
                {name || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button
              onClick={() => router.back()}
              variant="link"
              className="hover:no-underline cursor-pointer hidden md:block text-gray-900 "
            >
              {data?.username || 'Admin'}
            </Button>
          </div>
        </nav>
      </header>
      <main className=" mx-10 md:mx-40 py-10">
        <div className=" space-y-10">
          <div className="text-center mx-auto space-y-4">
            <ul className=" flex items-center justify-center list-disc list-outside">
              {formattedDate(dataById?.createdAt)}
              {/* {dataById?.createdAt}{' '} */}
              <li className="ml-7">Created by {dataById?.user?.role}</li>
            </ul>
            <h1 className="text-3xl font-semibold text-gray-900 mt-4 max-w-[642px]  mx-auto">
              {dataById?.title || 'Title of the Article'}
            </h1>
          </div>
          <Image
            src={dataById?.imageUrl ?? '/placeholder-image.webp'}
            width={1120}
            height={480}
            alt="Article Image"
            unoptimized
            priority
            className="w-full h-[480px] object-center object-cover rounded-xl"
          />

          <div className="prose prose-lg max-w-none mx-auto">
            <HTMLContent content={dataById?.content} />
          </div>
          <div className=" space-y-6 pt-10 pb-24.5">
            <h2 className="text-bold text-2xl">Other articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-10 md:space-y-0 space-y-10 ">
              {artikelOther
                ?.slice(0, 3)
                ?.map((items: any, index: number | string) => {
                  return <CardArtikelUser props={items} key={index} />;
                })}
            </div>
          </div>
        </div>
      </main>
      <footer className=" bg-[#2563EB] w-full flex justify-center items-center py-9 space-x-4 text-white">
        <Image
          src="/iconDashboard.svg"
          width={134}
          alt="iconDasboard"
          height={24}
          className="py-1.5"
          priority
        />
        <p>© 2025 Blog genzet. All rights reserved.</p>
      </footer>
    </div>
  );
}
