'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { DialogSettingDelet } from './DialogSetting';
import toast from 'react-hot-toast';
import { useMutationDeletProject } from '@/app/dashboard/features/useMutation';
import { useRouter } from 'next/navigation';

type Props = { slug: string };

export default function ButtonClient({ slug }: Props) {
  const [deletShowModel, setDeletShowModel] = React.useState<boolean>(false);
  const router = useRouter();
  const handleOpen = () => {
    setDeletShowModel((prev) => !prev);
  };

  const { mutate } = useMutationDeletProject({
    onSuccess: (res) => {
      if (res.status === 'error') {
        toast.error(res.error.message);
        return;
      }
      toast.success('Create Successfully');
      setTimeout(() => {
        setDeletShowModel(!deletShowModel);
        router.push('/dashboard');
      }, 400);
    },
  });

  const handleDelet = () => {
    if (slug) {
      mutate(slug);
    }
  };
  return (
    <div className="w-full flex flex-col items-center space-y-3">
      <DialogSettingDelet
        handleOpen={handleOpen}
        handleDelet={handleDelet}
        deletShowModel={deletShowModel}
      />
      <Button
        className="w-full cursor-pointer"
        variant={'destructive'}
        onClick={() => handleOpen()}
      >
        Deket Project
      </Button>
      <Link href={'/dashboard'} className="text-primary underline capitalize">
        Back to dashboard
      </Link>
    </div>
  );
}
