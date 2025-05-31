import ArtikelUpdateClinet from '@/features/artikel/components/ArtikelUpdateClient';
import PreviewClient from '@/features/preview/PreviewClient';

import React from 'react';
type Params = Promise<{ slug: string }>;
export default async function page({ params }: { params: Params }) {
  const { slug } = await params;
  
  await new Promise((resolve) =>
    setTimeout(() => resolve('internal delay'), 400),
  );
  return <PreviewClient slug={slug} />;
}
