'use client';
import { useForm } from 'react-hook-form';
import { SchemaZodRegister } from '../../../lib/validations/registerValidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { IregisterFormValidate } from '@/lib/validations';


export const useFormRegister = ({ defaultValues }: { defaultValues: IregisterFormValidate }) => {
  return useForm<IregisterFormValidate>({
    defaultValues: defaultValues,
    resolver: zodResolver(SchemaZodRegister),
  });
};
