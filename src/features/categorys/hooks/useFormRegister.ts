'use client';
import { useForm } from 'react-hook-form';
import { IcategoryForm } from '../types/types';
import { SchemaZod } from '../schemas/schemaZod';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormCategory = ({ defaultValues }: { defaultValues: IcategoryForm }) => {
  return useForm<IcategoryForm>({
    defaultValues: defaultValues,
    resolver: zodResolver(SchemaZod),
  });
};
