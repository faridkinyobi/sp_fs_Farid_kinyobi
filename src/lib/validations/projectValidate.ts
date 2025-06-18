import z from 'zod';

export const SchemaZodProject = z.object({
  name: z.string().nonempty('Name field cannot be empty'),
  owner: z.string().uuid('Invalid owner ID').optional(),
});
