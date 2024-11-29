import React from 'react';
import { redirect } from 'next/navigation';

import { auth, signOut } from '@/app/lib/auth';
import { AuthError } from 'next-auth';

export default async function Home() {
  const session = await auth()
  if (session) {
    return (
      <form action={async () => {
        'use server'
        try {
          await signOut()
        } catch (err) {
          if (err instanceof AuthError) {
            console.error(err)
            return redirect(`/api/auth/error?error=${err.type}`)
          }
          throw err;
        }
      }}>
        <p>Logged In</p>
        <button type='submit'
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Sign Out
        </button>
      </form>
    )
  } else {
    return redirect('/auth/login')
  }
}
