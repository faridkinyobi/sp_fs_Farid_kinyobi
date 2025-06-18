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
import { useFormProject } from '../useFormProject';
import {
  useMutationEditProject,
  useMutationFetchProject,
  useMutationProject,
} from '../useMutation';

export default function FormProject() {
  // hook form
  const form = useFormProject({
    defaultValues: {
      name: '',
    },
  });

  const { control, handleSubmit, setValue } = form;

  // context
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { id, setOpen, open, setId } = context;

  useEffect(() => {
    if (id) {
      setValue('name', (id as any).name || '');
    }
  }, [open.project]);

  const { refetch } = useMutationFetchProject();

  // add project
  const { mutate: AddProject, isPending } = useMutationProject({
    onSuccess: async (res) => {
      if (res.status === 'error') {
        toast.error(res.error.message);
        return;
      }
      toast.success('Add Success');
      setOpen({ ...open, project: !open.project });
      refetch();
    },
  });

  // // edit project
  const { mutate: EditProject } = useMutationEditProject({
    onSuccess: async () => {
      toast.success('Create Successfully');
      setOpen({ ...open, project: !open.project });
      refetch();
    },
  });

  const onSubmite = async (data: { name: string }) => {
    if (id?.id) {
      EditProject({ id: id.id, body: { name: data.name } });
    } else {
      AddProject(data);
    }
  };

  const handleClose = React.useCallback(() => {
    setOpen((prev: typeof open) => ({ ...prev, project: !open.project }));
    if (open.project) {
      setId(null);
    }
  }, [setOpen, open]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmite)} className=" space-y-6 w-full">
        <div className="space-y-3">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input Name" {...field} type="text" />
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
            className="cursor-pointer"
            onClick={() => handleClose()}
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
