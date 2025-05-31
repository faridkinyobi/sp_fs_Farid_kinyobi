'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFormArtikel } from '../hooks/useFormArtikel';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { IFormArtikelValues } from '../types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreatArtikel } from '../query/useCreatArtikel';
import { SelectMolecul } from '@/components/molecule/SelectMolecul';
import { useRouter } from 'next/navigation';
import TiptapTextEditor from '@/components/molecule/TiptapTextEditor';
import Link from 'next/link';
import { useFetchCatagory } from '@/features/categorys/query/useFetchCatagory';
import { ImagePlus } from 'lucide-react';
import { useCreatImage } from '../query/useCreatImage';
import { imageUrlRespon } from '../types/types';
import { useUpdateArtikel } from '../query/useUpdateArtikel';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function FormAtikelClient({
  dataById,
}: {
  dataById?: IFormArtikelValues;
}) {
  const router = useRouter();
  const form = useFormArtikel({
    defaultValues: {
      imageUrl: '',
      title: '',
      categoryId: '',
      content: '',
    },
  });
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    // formState: { errors },
  } = form;

  const refInputFile = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutate, isPending } = useCreatArtikel({
    onSuccess: async (data) => {
      if (data) {
        router.push('/dashboard/artikel');
      }
    },
  });

  // set value get by Id
  useEffect(() => {
    if (dataById) {
      setValue('imageUrl', dataById.imageUrl);
      setValue('title', dataById.title);
      setValue('categoryId', dataById.categoryId);
      setValue('content', dataById.content);
      setPreviewUrl(dataById.imageUrl);
    }
  }, [dataById, setValue]);

  // creat Img
  const { mutate: MutateImg } = useCreatImage({
    onSuccess: (data) => {
      const imageUrl = data as imageUrlRespon;
      setValue('imageUrl', imageUrl.imageUrl, { shouldValidate: true });
      setPreviewUrl(imageUrl.imageUrl);
      refInputFile.current!.value = '';
    },
  });

  // update artikel
  const { mutate: UpdateArtikel } = useUpdateArtikel({
    onSuccess: () => {
      router.push('/dashboard/artikel');
    },
  });

  // submite
  const onSubmite = async (data: IFormArtikelValues) => {
    if (dataById?.id) {
      UpdateArtikel({ ...data, id: dataById.id });
      MutateImg({ imageUrl: data.imageUrl });
      toast.success('Update Successfully');
    } else {
      mutate(data);
      MutateImg({ imageUrl: data.imageUrl });
      toast.success('Create Successfully');
    }
  };

  // category data select
  const { data }: { data?: { data: any[] } } = useFetchCatagory({
    page: 1,
    search: '',
  });
  const options = data?.data || [];

  const handlerUploadFile = () => {
    if (refInputFile) refInputFile?.current?.click();
  };

  const handlerdelatFile = () => {
    setPreviewUrl(null);
    refInputFile.current!.value = '';
  };

  const handleChangeUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // setFile(selectedFile);
      // generate preview jika image
      const fileURL = URL.createObjectURL(selectedFile);
      setValue('imageUrl', fileURL, { shouldValidate: true });
      setPreviewUrl(fileURL);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmite)} className=" space-y-6 w-full">
        <div className="space-y-4">
          <FormField
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnails</FormLabel>

                <div
                  className={` ${previewUrl ? 'border-solid' : 'border-dashed'} border rounded-lg  border-border max-w-[223px] max-h-[163px] flex flex-col justify-center space-y-3 px-3 py-11.5 bg-white`}
                >
                  {previewUrl ? (
                    <div className=" space-y-2">
                      <Image
                        unoptimized
                        src={previewUrl}
                        alt="Preview"
                        className=" object-cover rounded-md "
                        width={199}
                        height={115}
                        priority
                      />
                      <div className="flex flex-row items-center justify-center space-x-2.5">
                        <Button
                          type="button"
                          variant={'link'}
                          onClick={handlerUploadFile}
                          className=" h-4 w-16 underline cursor-pointer"
                        >
                          Changes
                        </Button>
                        <Button
                          size={'sm'}
                          variant={'link'}
                          onClick={handlerdelatFile}
                          className="h-4 w-12 underline cursor-pointer "
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className=" flex flex-col items-center space-y-3 px-3 ">
                      <ImagePlus />
                      <div className=" space-y-1 text-center">
                        <Button
                          variant={'link'}
                          className="underline text-primary "
                          onClick={handlerUploadFile}
                        >
                          Click to select files
                        </Button>
                        <FormDescription>
                          Suport File Type : jpg or png
                        </FormDescription>
                      </div>
                    </div>
                  )}
                </div>
                <FormControl>
                  <Input
                    type="file"
                    ref={refInputFile}
                    placeholder="Input username"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleChangeUploadFile}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className=" relative">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Input title" type={'text'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <SelectMolecul
                    {...field}
                    onValueChange={field.onChange}
                    placeholder="Select Category"
                    classPlaceholder="placeholder:text-[#111827] "
                    className="w-full text-[#111827] "
                    options={options}
                  />
                </FormControl>
                <FormDescription>
                  The existing category list can be seen in the{' '}
                  <Link className="text-primary" href={'/dashboard/category'}>
                    category
                  </Link>{' '}
                  menu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TiptapTextEditor val={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-2 py-3 md:py-4 m-5 md:m-6 ">
          <Button
            type="button"
            variant={'outline'}
            className=" cursor-pointer  bg-white hover:bg-neutral-100 "
            disabled={isPending}
            onClick={() => router.back()}
          >
            close
          </Button>
          <Button
            type="button"
            variant={'outline'}
            className="bg-border cursor-pointer hover:bg-[#d7dde6]"
            disabled={isPending}
          >
            Preview
          </Button>
          <Button
            type="submit"
            variant={'default'}
            className=" cursor-pointer"
            disabled={isPending}
          >
            Upload
          </Button>
        </div>
      </form>
    </Form>
  );
}
