'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IprojectFormValidate, SchemaZodProject } from '@/lib/validations';

export const useFormProject = ({ defaultValues }: { defaultValues: IprojectFormValidate}) => {
  return useForm<IprojectFormValidate>({
    defaultValues: defaultValues,
    resolver: zodResolver(SchemaZodProject),
  });
};
