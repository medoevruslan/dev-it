import { useNavigate } from 'react-router-dom';

// import { SigninForm } from '@/components/auth'
// import { SigninFormValues } from '@/components/auth/signin-form'
// import { useLoginMutation } from '@/services/auth/auth.service'

import { SigninForm } from '@/src/components/auth/signin-form';

export const Signin = () => {
  // const [login] = useLoginMutation()
  //
  // const navigate = useNavigate()
  //
  // const handleSignin = async (data: SigninFormValues) => {
  //   try {
  //     await login(data).unwrap()
  //     navigate('/', { replace: true })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const handleSignin = () => {};

  return (
    <section
      className={'flex justify-center items-center h-[calc(100vh-61px)]'}
    >
      <SigninForm onSubmit={handleSignin} />
    </section>
  );
};
