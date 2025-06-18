'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormLogin } from './useFormAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutationAuth } from './useMutation';
import toast from 'react-hot-toast';
import { IAuthFormValidate } from '@/lib/validations';

export default function authForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useFormLogin({
    defaultValues: {
      email: '',
      password: '',
    },
  }) as ReturnType<typeof useFormLogin>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isPending } = useMutationAuth({
    onSuccess: async (res) => {
      if (res.status === 'error') {
        toast.error(res.error.message);
        return;
      }
      localStorage.setItem('email', res.email);
      toast.success('Login Successfully');
      router.push('/dashboard');
    },
  });

  const onSubmite = async (data: IAuthFormValidate) => {
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
                  <Input placeholder="Input email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Input password"
                    type={showPassword ? 'text' : 'password'}
                    className=" relative"
                  />
                </FormControl>
                <span
                  className={` absolute right-4 ${errors.password ? ' top-[45%]' : ' top-2/3'}   -translate-y-1/2 cursor-pointer text-muted-foreground `}
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
          {isPending ? (
            <div className="flex gap-1 items-center">
              <LoaderCircle className="animate-spin" />
              Processing…
            </div>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </Form>
  );
}
