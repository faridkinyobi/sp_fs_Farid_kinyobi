'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ItaskFormValidate,SchemaZodTask } from '@/lib/validations';

export const useFormTask = ({ defaultValues }: { defaultValues: ItaskFormValidate}) => {
  return useForm<ItaskFormValidate>({
    defaultValues: defaultValues,
    resolver: zodResolver(SchemaZodTask),
  });
};
