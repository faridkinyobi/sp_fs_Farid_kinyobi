'use client';
import { useForm } from 'react-hook-form';
import { IAuthForm } from '../types/types';
import { SchemaZod } from '../schemas/shemaZod';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormLogin = ({ defaultValues }: { defaultValues: IAuthForm }) => {
  return useForm<IAuthForm>({
    defaultValues: defaultValues,
    resolver: zodResolver(SchemaZod),
  });
};
