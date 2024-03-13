import { useNavigate } from 'react-router-dom';

import {
  SigninForm,
  SigninFormValues,
} from '@/src/components/auth/signin-form';
import { useLoginMutation } from '@/src/services/auth/auth.service';
import { ApiErrorType, CustomerError } from '@/src/services/types';
import { useState } from 'react';

export const Signin = () => {
  const [login] = useLoginMutation();
  const [errors, setErros] = useState<ApiErrorType[]>([]);

  const navigate = useNavigate();

  const handleSignin = async (data: SigninFormValues) => {
    try {
      await login(data).unwrap();
      navigate('/', { replace: true });
    } catch (err) {
      if ('status' in (err as CustomerError)) {
        const { errors: errorMessages } = (err as CustomerError).data.error;
        setErros(errorMessages);
      }
    }
  };

  return (
    <section
      className={'flex justify-center items-center h-[calc(100vh-61px)]'}
    >
      <SigninForm apiErrors={errors} onSubmit={handleSignin} />
    </section>
  );
};
