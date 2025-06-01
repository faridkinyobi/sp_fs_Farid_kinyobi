'use client';
import React from 'react';
import { useFormLogin } from '../hooks/useFormAuth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { IAuthForm } from '../types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutationAuth } from '../query/useMutation';
import { IresultRes } from '../types/types';
import { setAuthCookies } from '@/lib/actions';
import toast from 'react-hot-toast';

export default function authForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useFormLogin({
    defaultValues: {
      username: '',
      password: '',
    },
  }) as ReturnType<typeof useFormLogin>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { mutate, isPending } = useMutationAuth({
    onSuccess: async (value: IresultRes) => {
      await setAuthCookies(value.token, value.role); // next header
      toast.success('Login Successfully');
      if ('Admin' === value.role) {
        router.push('/dashboard/artikel');
      } else if (value.role === 'User') {
        router.push('/user/artikel');
      }
    },
    onError: async (error) => {
      const status = (error as any)?.status;
      const storeRegister = localStorage.getItem('register');
      const parse = storeRegister ? JSON.parse(storeRegister) : [];

      const getPassword = form.getValues('password').toLocaleLowerCase();
      const getUsername = form.getValues('username').toLocaleLowerCase();
      if (status === 404) {
        if (
          (getPassword === 'admin' && getUsername === 'admin') ||
          ('admin' === parse.password && 'admin' === parse.username)
        ) {
          await setAuthCookies('token error admin', 'Admin');
          router.push('/dashboard/artikel');
        } else if (
          (getPassword === 'user' && getPassword === 'user') ||
          ('user' === parse.password && 'user' === parse.username)
        ) {
          await setAuthCookies('token eror user', 'User');
          router.push('/user/artikel');
        }
      }
    },
  });
  // check status jika erorr maka handle login dengan membandingan input form dengan semail
  const onSubmite = async (data: IAuthForm) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmite)} className=" space-y-6 w-full">
        <div className="space-y-3">
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Input username" {...field} />
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
                  className={` absolute ${errors.password ? 'right-2 top-[45%]' : ' right-2 top-2/3'}   -translate-y-1/2 cursor-pointer text-muted-foreground `}
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
          Login
        </Button>
      </form>
    </Form>
  );
}
