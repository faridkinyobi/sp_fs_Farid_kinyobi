import React from 'react';
import UserArtikelClient from '@/features/artikel/components/user/userArtikelClient';

export default async function Page() {
  await new Promise((resolve) =>
    setTimeout(() => resolve('internal delay'), 400),
  );
  return <UserArtikelClient />;
}
