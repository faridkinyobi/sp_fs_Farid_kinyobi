import ArtikelCreatClinet from '@/features/artikel/components/ArtikelCreatClinet';
import React from 'react';

export default async function page() {
  await new Promise((resolve) =>
    setTimeout(() => resolve('internal delay'), 400),
  );
  return <ArtikelCreatClinet />;
}
