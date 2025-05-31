import { z } from 'zod';

export const SchemaZod = z.object({
  username: z.string().nonempty('Please enter your username'),
  password: z.string().nonempty('Please enter your password'),
});
