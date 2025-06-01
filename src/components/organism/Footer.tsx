import Image from 'next/image';
import React from 'react';

export default function Footer() {
  return (
    <footer className=" bg-[#2563EB] w-full flex flex-wrap justify-center items-center py-9 space-x-4 text-white">
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
  );
}
