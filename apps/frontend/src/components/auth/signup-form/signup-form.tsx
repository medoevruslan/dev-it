import { useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Card } from '@/src/components/ui/card';
import { Typography } from '@/src/components/ui/typography';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { useEffect } from 'react';
import { SigninFormValues } from '@/src/components/auth/signin-form';
import { ApiErrorType } from '@/src/services/types';

const SignupFormSchema = z
  .object({
    passwordConfirmation: z.string().min(3),
    email: z.string().email(),
    username: z.string().min(1),
    password: z.string().min(3).max(10),
  })
  .refine(
    ({ passwordConfirmation, password }) => password === passwordConfirmation,
    { message: "Passwords don't match", path: ['passwordConfirmation'] }
  );

export type SignupFormValues = z.infer<typeof SignupFormSchema>;
export type RequestSignupFormValues = Omit<SignupFormValues, 'confirmPassword'>;

export type Props = {
  onSubmit: (data: RequestSignupFormValues) => void;
  apiErrors: ApiErrorType[];
};

export const SignupForm = ({ onSubmit, apiErrors }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<SignupFormValues>({
    defaultValues: {
      username: '',
      passwordConfirmation: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(SignupFormSchema),
  });

  useEffect(() => {
    apiErrors?.forEach((err) => {
      console.log('set error: ', err.message);
      setError(
        err.field as keyof Omit<SigninFormValues, 'rememberMe'>,
        {
          message: err.message,
        },
        { shouldFocus: true }
      );
    });
  }, [apiErrors]);

  return (
    <form className={'w-[420px] max-w-full'} onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Card className={'w-[420px] max-w-full'}>
        <header className={'text-center'}>
          <Typography variant={'h1'}>Sign Up</Typography>
        </header>
        <Input
          {...register('username')}
          className={' mb-6 w-full'}
          error={errors.username?.message}
          id={'username'}
          label={'Username'}
        />
        <Input
          {...register('email')}
          className={' mb-6 w-full'}
          error={errors.email?.message}
          id={'email'}
          label={'Email'}
        />
        <Input
          {...register('password')}
          autoComplete={'off'}
          className={'mb-3 w-full'}
          error={errors.password?.message}
          id={'password'}
          label={'Password'}
          type={'password'}
        />
        <Input
          {...register('passwordConfirmation')}
          autoComplete={'off'}
          className={'mb-3 w-full'}
          error={errors?.passwordConfirmation?.message}
          id={'passwordConfirmation'}
          label={'Confirm Password'}
          type={'password'}
        />
        <Button className={'mt-[60px] mb-[20px]'} fullwidth variant={'primary'}>
          Sign Up
        </Button>
        <footer className={'text-center'}>
          <Typography className={'mb-2'} variant={'body2'}>
            Have an account?
          </Typography>
          <Typography variant={'subtitle2'}>
            <a
              className={
                'text-accent-500 underline transition hover:text-light-100'
              }
              href={'/login'}
            >
              Sign In
            </a>
          </Typography>
        </footer>
      </Card>
    </form>
  );
};
