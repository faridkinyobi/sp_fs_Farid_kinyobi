import z from 'zod';

export const SchemaZod = z.object({
  imageUrl: z.string().nonempty('Please enter picture'),
  title: z.string().nonempty('Please enter title'),
  categoryId: z.string().nonempty('Please select category'),
  content: z.string().nonempty('Content field cannot be empty'),
});
