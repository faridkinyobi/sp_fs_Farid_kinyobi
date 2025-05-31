'use client';
import { useForm } from 'react-hook-form';
import { IregisterForm } from '../types/types';
import { SchemaZod } from '../schemas/schemaZod';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormRegister = ({ defaultValues }: { defaultValues: IregisterForm }) => {
  return useForm<IregisterForm>({
    defaultValues: defaultValues,
    resolver: zodResolver(SchemaZod),
  });
};
