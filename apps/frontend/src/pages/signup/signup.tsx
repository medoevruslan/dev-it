import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  RequestSignupFormValues,
  SignupForm,
} from '@/src/components/auth/signup-form';
import { useSignupMutation } from '@/src/services/auth/auth.service';
import { ApiErrorType, CustomerError } from '@/src/services/types';
import { useState } from 'react';

export const Signup = () => {
  const [errors, setErros] = useState<ApiErrorType[]>([]);
  const [signup] = useSignupMutation();
  const naviagte = useNavigate();
  const handleSignup = async (data: RequestSignupFormValues) => {
    try {
      const resp = await signup(data).unwrap();
      toast.success(`user ${resp.email} created`);
      naviagte('/');
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
      <SignupForm apiErrors={errors} onSubmit={handleSignup} />
    </section>
  );
};
