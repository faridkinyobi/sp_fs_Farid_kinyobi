import { z } from 'zod';

export const SchemaZodAut = z.object({
  email: z.string().nonempty('Email field cannot be empty').email(),
  password: z.string().nonempty('Please enter your Password'),
});
