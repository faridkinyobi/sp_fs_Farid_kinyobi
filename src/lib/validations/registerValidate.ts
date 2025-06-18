import z from 'zod';

export const SchemaZodRegister = z
  .object({
    email: z.string().nonempty('Email field cannot be empty').email(),
    password: z.string().nonempty('Please enter your Password'),
    confirmpassword: z.string().nonempty('Please enter your comfirmPassword'),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: 'Password and confirmation do not match',
    path: ['confirmpassword'],
  });
