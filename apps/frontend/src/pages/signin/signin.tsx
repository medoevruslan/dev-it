import { useNavigate } from 'react-router-dom';

import {
  SigninForm,
  SigninFormValues,
} from '@/src/components/auth/signin-form';
import { useLoginMutation } from '@/src/services/auth/auth.service';

export const Signin = () => {
  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const handleSignin = async (data: SigninFormValues) => {
    try {
      await login(data).unwrap();
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      className={'flex justify-center items-center h-[calc(100vh-61px)]'}
    >
      <SigninForm onSubmit={handleSignin} />
    </section>
  );
};
