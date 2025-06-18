'use client';
import React from 'react';
import { useFormRegister } from './useFormRegister';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useMutationRegister } from './useMutionRegirter';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IregisterFormValidate } from '@/lib/validations';

export default function RegisterForm() {
  const router = useRouter();
  const form = useFormRegister({
    defaultValues: {
      email: '',
      password: '',
      confirmpassword: '',
    },
  });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isPending } = useMutationRegister({
    onSuccess: async (res) => {
      if (res.status === 'error') {
        toast.error(res.error.message);
        return;
      }
      toast.success('Register Successfully ');
      router.push('/login');
    },
  });

  const onSubmite = async (data: IregisterFormValidate) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmite)} className=" space-y-6 w-full">
        <div className="space-y-3">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input email"
                    {...field}
                    type="email"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className=" relative">
                <FormLabel>Password</FormLabel>
                <FormControl className=" relative">
                  <Input
                    {...field}
                    placeholder="Input password"
                    type={showPassword ? 'text' : 'password'}
                  ></Input>
                </FormControl>
                <span
                  className={` absolute right-4 ${errors.password ? ' top-[45%] ' : 'top-2/3'} -translate-y-1/2 cursor-pointer text-muted-foreground `}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Comfrim Password</FormLabel>
                <FormControl className=" relative">
                  <Input
                    {...field}
                    placeholder="Input password"
                    type={showPassword ? 'text' : 'password'}
                  ></Input>
                </FormControl>
                <span
                  className={` absolute right-4 ${errors.password ? ' top-[45%] ' : errors.confirmpassword ? 'top-[45%]' : ' top-2/3'}   -translate-y-1/2 cursor-pointer text-muted-foreground `}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
