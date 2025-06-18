import z from 'zod';

export const SchemaZodTask = z.object({
  title: z.string().nonempty('Name field cannot be empty'),
  description: z.string().nonempty('Descriptionfield cannot be empty'),
  projectId: z
    .string()
    .uuid('Invalid owner ID')
    .nonempty('projectId cannot be empty'),
  status: z.string().optional(),
});
