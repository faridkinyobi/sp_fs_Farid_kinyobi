'use client';
import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { IcategoryForm, CatagoryFormProps, Icategory } from '../types/types';
import { useFormCategory } from '../hooks/useFormRegister';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAddCategory } from '../query/useAddCategory';
import { useEditCategory } from '../query/useEditsCategory';
import { DialogFooter } from '@/components/ui/dialog';
import { ProviderContext } from '@/context/ThemeContext';
import toast from 'react-hot-toast';

export default function CategoryForm({ onClose }: CatagoryFormProps) {
  // hook form
  const form = useFormCategory({
    defaultValues: {
      name: '',
    },
  });

  const { control, handleSubmit, setValue } = form;

  // context
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { idCatagory } = context;

  useEffect(() => {
    setValue('name', idCatagory?.name || '');
  }, [idCatagory]);

  // add Category
  const { mutate: AddCatagory, isPending } = useAddCategory({
    onSuccess: async () => {
      onClose();
      window.location.reload();
    },
  });

  // edit Category
  const { mutate: EditCategory } = useEditCategory({
    onSuccess: async () => {
      onClose();
      window.location.reload();
    },
  });

  const onSubmite = async (data: IcategoryForm) => {
    const categoryItem = localStorage.getItem('category');
    const dummyData = categoryItem ? JSON.parse(categoryItem) : [];

    if (idCatagory?.id) {
      EditCategory({ ...data, id: idCatagory.id });

      const updateDataStorege = dummyData.map((items: any) =>
        items.id === idCatagory.id ? { ...items, name: data.name } : items,
      );
      localStorage.setItem('category', JSON.stringify(updateDataStorege));
      toast.success('Update Successfully');
    } else {
      AddCatagory(data);
      const payload = {
        id: new Date().getTime() + '-category',
        name: data.name,
        createdAt: new Date().toISOString(),
      };
      toast.success('Create Successfully');
      const updatedData = [...dummyData, payload];
      localStorage.setItem('category', JSON.stringify(updatedData));
      onClose();
    }
  };
  // console.log(category);
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmite)} className=" space-y-6 w-full">
        <div className="space-y-3">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Input Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="flex justify-end flex-row gap-2">
          <Button
            type="button"
            variant={'outline'}
            className=" font-medium"
            onClick={onClose}
            size={'sm'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size={'sm'}
            className="bg-[#2563EB]"
            disabled={isPending}
          >
            {idCatagory?.id ? 'Save Changes ' : 'Add'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
