'use client';
import { useForm } from 'react-hook-form';
import { SchemaZodAut } from '../../../lib/validations/authValidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { IAuthFormValidate } from '@/lib/validations';

export const useFormLogin = ({ defaultValues }: { defaultValues: IAuthFormValidate }) => {
  return useForm<IAuthFormValidate>({
    defaultValues: defaultValues,
    resolver: zodResolver(SchemaZodAut),
  });
};
