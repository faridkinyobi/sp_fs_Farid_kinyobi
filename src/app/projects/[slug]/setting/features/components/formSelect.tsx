'use client';
import React from 'react';
import { useFormSetting } from '../useFormSetting';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import SelectMember from './selectMember';
import { Button } from '@/components/ui/button';
import { useMutationAddMember, useMutationFetchUsers } from '../useMutation';
import { IsettingFormValidate } from '@/lib/validations';
import toast from 'react-hot-toast';

type Props = {
  slug: string;
};
export default React.memo(function FormSelectSetting({ slug }: Props) {
  const form = useFormSetting({
    defaultValues: {
      userId: '',
      projectId: '',
    },
  });
  const { control, handleSubmit, setValue } = form;

  React.useEffect(() => {
    setValue('projectId', slug);
  }, [slug]);

  const { mutate, isPending } = useMutationAddMember({
    onSuccess: (res) => {
      if (res.status === 'error') {
        toast.error(res.error.message);
        return;
      }
      console.log(res);
    },
  });
  const { data } = useMutationFetchUsers();

  const onSubmite = (data: IsettingFormValidate) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmite)} className=" space-y-3 w-full">
        <FormField
          name="userId"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <SelectMember
                  {...field}
                  options={Array.isArray(data) ? data : undefined}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary cursor-pointer w-full"
          disabled={isPending}
        >
          Add Member
        </Button>
      </form>
    </Form>
  );
});
