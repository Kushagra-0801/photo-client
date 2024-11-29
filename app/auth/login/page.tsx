import React from 'react'
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"

import { signIn, auth, providerMap } from "@/app/lib/auth"

type SearchParams = Promise<{ callbackUrl: string | undefined }>;

export default async function Login(props: { searchParams: SearchParams }) {
  const session = await auth();
  const callbackUrl = (await props.searchParams)?.callbackUrl ?? '/'
  if (session) {
    redirect('/')
  }
  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <form key={provider.id}
          action={async () => {
            "use server"
            try {
              await signIn(provider.id, {
                redirectTo: callbackUrl,
              })
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                console.error(error)
                return redirect(`/api/auth/error?error=${error.type}`)
              }

              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
          <button type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  )
}
