'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IsettingFormValidate, SchemaZodSetting } from '@/lib/validations';

export const useFormSetting = ({
  defaultValues,
}: {
  defaultValues: IsettingFormValidate;
}) => {
  return useForm<IsettingFormValidate>({
    defaultValues: defaultValues,
    resolver: zodResolver(SchemaZodSetting),
  });
};
