import { useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Card } from '@/src/components/ui/card';
import { Typography } from '@/src/components/ui/typography';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';

const SignupFormSchema = z
  .object({
    passwordConfirmation: z.string().min(3),
    email: z.string().email(),
    username: z.string().min(1),
    password: z.string().min(3).max(10),
  })
  .refine(
    ({ passwordConfirmation, password }) => password === passwordConfirmation,
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  );

export type SignupFormValues = z.infer<typeof SignupFormSchema>;
export type RequestSignupFormValues = Omit<SignupFormValues, 'confirmPassword'>;

export type Props = {
  onSubmit: (data: RequestSignupFormValues) => void;
};

export const SignupForm = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignupFormValues>({
    defaultValues: {
      username: '',
      passwordConfirmation: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(SignupFormSchema),
  });

  const handleOnSubmit = (data: SignupFormValues) => {
    onSubmit({
      email: data.email,
      password: data.password,
      username: data.username,
      passwordConfirmation: data.passwordConfirmation,
    });
  };

  return (
    <form
      className={'w-[420px] max-w-full'}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
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
          error={errors.passwordConfirmation?.message}
          id={'confirm-password'}
          label={'Confirm Password'}
          type={'password'}
        />
        <Button className={'mt-[60px] mb-[20px]'} fullwidth variant={'primary'}>
          Sign Up
        </Button>
        <footer className={'text-center'}>
          <Typography variant={'body2'}>
            <a className={'mb-2'} href={'#'}>
              Don&apos;t have an account?
            </a>
          </Typography>
          <Typography variant={'subtitle2'}>
            <a
              className={
                'text-accent-500 underline transition hover:text-light-100'
              }
              href={'#'}
            >
              Sign In
            </a>
          </Typography>
        </footer>
      </Card>
    </form>
  );
};
