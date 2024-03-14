import { useNavigate } from 'react-router-dom';

import {
  SigninForm,
  SigninFormValues,
} from '@/src/components/auth/signin-form';
import { useLoginMutation } from '@/src/services/auth/auth.service';
import { ApiErrorType, CustomerError } from '@/src/services/types';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
        const customerError = (err as CustomerError).data;
        if (customerError?.error) {
          const { errors: errorMessages } = customerError.error;
          if (errorMessages.length) {
            setErros(errorMessages);
          } else {
            toast.error(customerError.error.message);
          }
        }
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
