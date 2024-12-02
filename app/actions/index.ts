'use server'

import { auth } from '@/app/lib/auth'
import DbClient from '@/app/lib/db'
import type { Library } from '@/app/lib/definitions'

export const uploadFiles = async () => {
  const session = await auth()
  const collection = DbClient.db('test').collection<Library>('library')
  const newFiles = [
    {
      name: 'ph1.jpeg',
      type: 'image/jpeg',
      url: 'https://api.slingacademy.com/public/sample-photos/1.jpeg',
      tags: ['aaaa', 'bbbb', 'cccc', 'dddd'],
    },
    {
      name: 'ph2.jpeg',
      type: 'image/jpeg',
      url: 'https://api.slingacademy.com/public/sample-photos/2.jpeg',
      tags: ['bbbb', 'cccc'],
    },
    {
      name: 'ph3.jpeg',
      type: 'image/jpeg',
      url: 'https://api.slingacademy.com/public/sample-photos/3.jpeg',
      tags: ['cccc', 'dddd', 'bbbb', 'eeee'],
    },
  ]
  await collection.updateOne(
    { userId: session?.user?.id },
    {
      $push: {
        files: {
          $each: newFiles
        }
      }
    },
    { upsert: true }
  )
}

export const getLibrary = async () => {
  const session = await auth()
  if (!session) {
    return []
  }
  const collection = DbClient.db('test').collection<Library>('library')
  const library = await collection.findOne({ userId: session?.user?.id })
  return library?.files ?? []
}
