import { z } from 'zod';
import { SchemaZod } from '../schemas/shemaZod';

export type IAuthForm = z.infer<typeof SchemaZod>;
export type IresultRes = {
  token: string;
  role: string;
};
export type IuseLoginProps = {
  onSuccess: (data: IresultRes) => void;
  onError: (error: any) => void;
};
