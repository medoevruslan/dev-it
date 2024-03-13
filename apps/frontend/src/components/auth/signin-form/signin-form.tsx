import { useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Typography } from '@/src/components/ui/typography';
import { Input } from '@/src/components/ui/input';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { CheckboxControlled } from '@/src/components/ui/controlled/checkbox-controlled';

const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
});

export type SigninFormValues = z.infer<typeof SigninFormSchema>;

export type Props = {
  onSubmit: (data: SigninFormValues) => void;
};

export const SigninForm = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SigninFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(SigninFormSchema),
  });

  return (
    <form className={'w-[420px] max-w-full'} onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Card className={'w-full py-6 px-9'}>
        <header className={'mb-7 text-center'}>
          <Typography variant={'h1'}>Sign In</Typography>
        </header>
        <Input
          {...register('email')}
          className={'w-full mb-6'}
          error={errors.email?.message}
          id={'email'}
          label={'Email'}
        />
        <Input
          {...register('password')}
          className={'w-full mb-3'}
          error={errors.password?.message}
          id={'password'}
          label={'Password'}
          type={'password'}
        />
        <CheckboxControlled
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
        />
        <Button className={'mt-[60px] mb-[20px]'} fullwidth variant={'primary'}>
          Sign In
        </Button>
        <footer className={'text-center'}>
          <Typography className={'mb-2'} variant={'body2'}>
            Don&apos;t have an account?{' '}
          </Typography>
          <Typography variant={'subtitle2'}>
            <a
              className={
                'text-accent-500 underline transition hover:text-light-100'
              }
              href={'/signup'}
            >
              Sign Up
            </a>
          </Typography>
        </footer>
      </Card>
    </form>
  );
};
