import React from 'react';
import { redirect } from 'next/navigation';

import { auth } from '@/app/lib/auth';
import Container from '@/components/Container';
import ImageGrid from '@/components/ImageGrid';

export default async function Home() {
  const session = await auth()
  if (!session) {
    return redirect('/auth/login')
  }
  return (
    <Container>
      <ImageGrid />
    </Container>
  )
}
