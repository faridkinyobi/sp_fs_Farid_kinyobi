'use client';
import { ReactNode, useCallback, useMemo } from 'react';
import { createContext, useState } from 'react';
import { CountContextType, IDgetcontext, IOpenModel } from './type';

export const ProviderContext = createContext<CountContextType | undefined>(
  undefined,
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<IDgetcontext | null>(null);
  const [open, setOpen] = useState<IOpenModel>({
    task: false,
    project: false,
    logout: false,
  });

  const contextValue = useMemo(
    () => ({
      id,
      open,
      setId,
      setOpen,
    }),
    [id, open],
  );

  return (
    <ProviderContext.Provider value={contextValue}>
      {children}
    </ProviderContext.Provider>
  );
}
