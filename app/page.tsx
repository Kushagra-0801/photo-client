import { signIn, signUp } from '@/lib/auth-client';

import Form from 'next/form';

export default function Home() {
  const loginHandler = async (formData: FormData) => {
    'use server';
    // signIn()
  };

  const signUpHandler = async (formData: FormData) => {
    'use server';

    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';
    console.log(email, ':::', password);
    const { data, error } = await signUp.email({
      email, password, name: 'Kush',
    }, {
      onSuccess: (ctx) => {
        alert('signed up')
      }
    })
  };

  return (
    <div>
      <Form action={loginHandler}>
        <label>
          Email:
          <input id='email' name='email' />
        </label>
        <label>
          Password:
          <input id='password' name='password' type='password' />
        </label>
        <button type='submit'>Log In</button>
      </Form>
      <Form action={signUpHandler}>
        <label>
          Email:
          <input id='email' name='email' />
        </label>
        <label>
          Password:
          <input id='password' name='password' type='password' />
        </label>
        <button type='submit'>Sign Up</button>
      </Form>
    </div>
  );
}
