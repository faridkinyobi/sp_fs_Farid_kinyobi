'use client';
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/organism/sidebar';
import { AppNavbar } from '@/components/organism/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 bg-white shadow-sm w-full">
            <AppNavbar />
          </header>
          <main className="md:flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
