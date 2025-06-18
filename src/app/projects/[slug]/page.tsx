import React from 'react';
import ListColume from './features/components/ListColume';
import { HeaderTask } from './features/components/HeaderContaint';

export default async function page() {
  await new Promise((resolve) =>
    setTimeout(() => resolve('internal delay'), 400),
  );
  return (
    <main className="space-y-10">
      <HeaderTask titleLink="Setting" />
      <ListColume  />
    </main>
  );
}
