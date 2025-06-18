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

import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { ProviderContext } from '@/context/ThemeContext';
import toast from 'react-hot-toast';
import { useFormTask } from '../useFormTask';
import { useMutationEditTask, useMutationTask } from '../useMutation';
import { ItaskFormValidate } from '@/lib/validations';
import { useSearchParams } from 'next/navigation';

export default function FormTask() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');

  // hook form
  const form = useFormTask({
    defaultValues: {
      title: '',
      description: '',
      projectId: '',
    },
  });

  const { control, handleSubmit, setValue } = form;

  // context
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { id, setId, setOpen, open } = context;

  useEffect(() => {
    setValue('projectId', projectId || '');
    if (id) {
      setValue('description', (id as any).description ?? '');
      setValue('title', (id as any).title ?? '');
    }
  }, [projectId]);

  // add task
  const { mutate: AddTask, isPending } = useMutationTask({
    onSuccess: async (res) => {
      if (res.status === 'error') {
        toast.error(res.error.message);
        return;
      }
      toast.success('Create Successfully');
      setTimeout(() => {
        setOpen((prev) => ({ ...prev, task: !prev.task }));
        window.location.reload();
      }, 400);
    },
  });

  // // edit Category
  const { mutate: EditTask } = useMutationEditTask({
    onSuccess: async (res) => {
      if (res.status === 'error') {
        toast.error(res.error.message);
        return;
      }
      toast.success('Create Successfully');
      setTimeout(() => {
        setOpen((prev) => ({ ...prev, task: !prev.task }));
        window.location.reload();
      }, 400);
    },
  });

  const onSubmite = async (data: ItaskFormValidate) => {
    if (id?.id) {
      EditTask({ id: id.id, body: data });
    } else {
      AddTask(data);
    }
  };

  const handleCloseModal = () => {
    if (open.task) {
      setId(null);
    }
    setOpen((prev) => ({ ...prev, task: !prev.task }));
  };
  // console.log(category);
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmite)} className=" space-y-6 w-full">
        <div className="space-y-3">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="Input title" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Input Description" {...field} />
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
            className=" cursor-pointer"
            onClick={() => handleCloseModal()}
            size={'sm'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size={'sm'}
            className="bg-primary cursor-pointer"
            disabled={isPending}
          >
            {id?.id ? 'Save Changes ' : 'Add'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
