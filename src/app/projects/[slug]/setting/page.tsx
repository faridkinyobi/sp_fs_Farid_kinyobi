import Link from 'next/link';
import React from 'react';

import FormSelectSetting from './features/components/formSelect';
import { Button } from '@/components/ui/button';
import { DialogSettingDelet } from './features/components/DialogSetting';
import ButtonClient from './features/components/ButtonClient';

type Params = Promise<{ slug: string }>;
export default async function page({ params }: { params: Params }) {
  const { slug } = await params;
  await new Promise((resolve) =>
    setTimeout(() => resolve('internal delay'), 400),
  );
  // console.log(slug,'setting')

  return (
    <div className="flex items-center justify-center">
      <div className=" bg-white py-10 px-4 flex flex-col  items-center justify-center space-y-6 w-[400px] mx-4 md:mx-0 my-10 rounded-xl">
        <h1 className=" font-bold text-xl">Add Member</h1>
        <FormSelectSetting slug={slug} />
        <ButtonClient slug={slug} />
      </div>
    </div>
  );
}
