import React from 'react';

import ArtikelTableClient from '@/features/artikel/components/ArtikelTableClient';

export default async function Page() {
  await new Promise((resolve) =>
    setTimeout(() => resolve('internal delay'), 400),
  );

  return <ArtikelTableClient />;
}
