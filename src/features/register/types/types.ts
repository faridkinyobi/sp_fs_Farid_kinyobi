import { z } from 'zod';
import { SchemaZod } from '../schemas/schemaZod';

export type IregisterForm = z.infer<typeof SchemaZod>;

export type IuseRegisterProps = {
  onSuccess: (data: IreponsRegister) => void;
};

export type IreponsRegister = {
  role: string;
  token: string;
};
