import z from 'zod';

export const SchemaZodSetting = z.object({
  projectId: z.string().uuid('Invalid owner ID'),
  userId: z
    .string().nonempty('Email field cannot be empty').uuid('Email member Invalid')
    ,
});
