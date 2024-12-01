import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github"

import DbClient from '@/app/lib/db'

const providers: Provider[] = [GitHub];

export const providerMap = providers
  .map(p => {
    if (typeof p === 'function') {
      const providerData = p()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: p.id, name: p.name }
    }
  }).filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: providers,
  adapter: MongoDBAdapter(DbClient),
  pages: {
    signIn: '/auth/login',
  }
})
