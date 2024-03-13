import { z } from 'zod';

export const createUserSchema = z
  .object({
    username: z.string({ required_error: 'username is required' }).min(1),
    email: z.string({ required_error: 'email is required' }).email(),
    password: z
      .string({ required_error: 'password is required' })
      .min(3)
      .max(10),
    passwordConfirmation: z.string().min(3),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(10),
});

export type CreateUserType = Required<z.infer<typeof createUserSchema>>;
export type LoginUserType = z.infer<typeof loginUserSchema>;
