import z from 'zod';

export const SchemaZod = z.object({
  username: z.string().nonempty('Username field cannot be empty'),
  password: z.string().min(8,"Password must be at least 8 characters long").nonempty('Please enter your username'),
  role: z.string(),
});
