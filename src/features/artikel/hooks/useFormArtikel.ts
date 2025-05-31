'use client';
import { useForm } from 'react-hook-form';
import { IArtikelForm} from '../types/types';
import { SchemaZod } from '../schemas/schemaZod';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormArtikel = ({ defaultValues }: { defaultValues: IArtikelForm }) => {
  return useForm<IArtikelForm>({
    defaultValues: defaultValues,
    resolver: zodResolver(SchemaZod),
  });
};
