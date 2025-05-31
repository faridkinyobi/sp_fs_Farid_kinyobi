'use client';
import { ReactNode } from 'react';
import { createContext, useState, useEffect } from 'react';
import { CountContextType, Category } from './type';

export const ProviderContext = createContext<CountContextType | undefined>(
  undefined,
);
// interface Category {
//   id: string;
//   name: string;
// }
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [idCatagory, setIdCatagory] = useState<Category | undefined>(undefined);

  return (
    <ProviderContext.Provider value={{ idCatagory, setIdCatagory }}>
      {children}
    </ProviderContext.Provider>
  );
}
import { useContext } from 'react';
