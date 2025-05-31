'use client';
import React from 'react';
import { useFormRegister } from '../hooks/useFormRegister';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { IregisterForm, IreponsRegister } from '../types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useMutationRegister } from '../query/useMutionRegirter';
import { SelectMolecul } from '@/components/molecule/SelectMolecul';
import { setAuthCookies } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const form = useFormRegister({
    defaultValues: {
      username: '',
      password: '',
      role: '',
    },
  });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { mutate, isPending } = useMutationRegister({
    onSuccess: async (value: IreponsRegister) => {
      await setAuthCookies(value.token, value.role);
      if ('Admin' === value.role) {
        router.push('/dashboard/artikel');
      } else if (value.role === 'User') {
        router.push('/user/artikel');
      }
    },
  });

  const onSubmite = async (data: IregisterForm) => {
    mutate(data);
    localStorage.setItem('register', JSON.stringify(data));
  };
  const options = [
    { name: 'Admin', value: 'Admin', id: '1' },
    { name: 'User', value: 'User', id: '2' },
  ];
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
              <FormItem className=" relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Input password"
                    type={showPassword ? 'text' : 'password'}
                  />
                </FormControl>
                <FormMessage />
                <span
                  className="absolute right-2 top-2/3 -translate-y-1/2 cursor-pointer text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <SelectMolecul
                    {...field}
                    onValueChange={field.onChange}
                    placeholder="Select Role"
                    classPlaceholder="placeholder:text-[#111827]"
                    className="w-full text-[#111827]"
                    options={options}
                  />
                </FormControl>
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
