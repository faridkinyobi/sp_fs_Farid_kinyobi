import z from 'zod';

export const SchemaZod = z.object({
  name: z.string().nonempty('Category field cannot be empty'),
});
