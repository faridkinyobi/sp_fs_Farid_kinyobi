'use clinet';
import React from 'react';
import HTMLContent from '@/utils/HTMLContent';
import Image from 'next/image';
import { formattedDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

export default function CardArtikelUser({ props }: { props?: any }) {
  const { title, content, createdAt, imageUrl, category, id } = props || {};
  const match = content.match(/<p[^>]*>(.*?)<\/p>/i); // ambil isi <p> pertama
  const rawText = match ? match[1].replace(/<[^>]+>/g, '') : ''; // hapus semua tag HTML di dalam
  const firstP = rawText.slice(0, 90);
  // const rest = match ? content.replace(firstP, '') : content;
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/preview/${id}`)}
      className=" space-y-4 max-w-[335px]  md:max-w-[386.67px] mx-auto cursor-pointer "
    >
      <Image
        src={imageUrl || '/placeholder-image.webp'}
        width={386.67}
        alt="iconDasboard"
        height={240}
        className=" h-[12.5rem] md:h-[15rem] rounded-xl object-cover object-center"
        priority
        unoptimized
      />
      {/* <div className="w-full h-[12.5rem] md:h-[15rem] bg-gray-300 rounded-xl "></div> */}
      {/* conten */}
      <div className="flex flex-col space-y-2 ">
        <p className="text-xs text-muted-foreground">
          {formattedDate(createdAt)}
          {/* April 13, 2025 */}
        </p>
        <h2 className="font-semibold text-base text-foreground">
          {title}

          {/* Cybersecurity Essentials Every Developer Should Know */}
        </h2>
        <div className=" [&_p>strong]:hidden [&_strong]:hidden">
          <HTMLContent content={firstP} />
        </div>

        {/* tachno */}
        <div className="w-full  flex items-start justify-start space-x-2">
          <div className=" py-1 px-3 rounded-full text-[#1E3A8A] bg-[#BFDBFE] text-xs md:text-sm ">
            {category.name || 'Technology'}
          </div>
          <div className=" py-1 px-3 rounded-full  text-[#1E3A8A] bg-[#BFDBFE] text-xs md:text-sm">
            Design
          </div>
        </div>
      </div>
    </div>
  );
}
