'use client';
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/organism/sidebar';
import { AppNavbar } from '@/components/organism/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className=" ">
      <AppSidebar />
      <main className="w-full ">
        <AppNavbar />
        {/* <SidebarTrigger /> */}
        <div className="m-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
