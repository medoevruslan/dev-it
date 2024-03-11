import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { useSignupMutation } from '@/services/auth/auth.service'
// import { CustomerError } from '@/services/definitions'

import {
  RequestSignupFormValues,
  SignupForm,
} from '@/src/components/auth/signup-form';

export const Signup = () => {
  // const [signup] = useSignupMutation()
  // const naviagte = useNavigate()
  // const _handleSignup = async (data: RequestSignupFormValues) => {
  //   try {
  //     const resp = await signup(data).unwrap()
  //
  //     toast.success(`user ${resp.email} created`)
  //     naviagte('/')
  //   } catch (err) {
  //     if ('status' in (err as CustomerError)) {
  //       const { errorMessages } = (err as CustomerError).data
  //
  //       for (const error of errorMessages) {
  //         if (error.field && error.message) {
  //           toast.error(`error: ${error.message} in ${error.field}`)
  //         } else {
  //           toast.error(JSON.stringify(error))
  //         }
  //       }
  //     } else {
  //       console.log(err)
  //     }
  //   }
  // }

  const handleSignup = () => {};

  return (
    <section
      className={'flex justify-center items-center h-[calc(100vh-61px)]'}
    >
      <SignupForm onSubmit={handleSignup} />
    </section>
  );
};
