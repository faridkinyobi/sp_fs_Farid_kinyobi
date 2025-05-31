import React from 'react';

import CategoryTableClient from '@/features/categorys/components/CategoryTableClient';

export default async function Page() {
  await new Promise((resolve) =>
    setTimeout(() => resolve('internal delay'), 400),
  );
  return <CategoryTableClient />;
}
