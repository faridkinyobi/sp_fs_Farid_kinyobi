'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '../ui/sidebar';

export function AppNavbar() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      setName(storedEmail.charAt(0).toUpperCase());
    }
  }, []);

  return (
    <nav className="border border-b bg-white ">
      <div className="px-10 flex items-center justify-between py-4 md:py-8">
        <SidebarTrigger size={'icon'} />
        <div className="flex items-center gap-1.5">
          <Avatar>
            <AvatarFallback className="bg-[#BFDBFE] text-[#1E3A8A]">
              {name}
            </AvatarFallback>
          </Avatar>
          <span className="ml-1 text-muted underline">{email}</span>
        </div>
      </div>
    </nav>
  );
}
