import React from 'react'

import Container from '@/components/Container';
import type { ImageData } from "@/app/lib/definitions";

const fetchImage = async (id: number): Promise<ImageData | null> => {
  const res = await fetch('https://api.slingacademy.com/v1/sample-data/photos/' + id).then(r => r.json());
  if (res.success) {
    return [res.photo].map((p: { id: number; url: string; }) => ({
      id: `${p.id}`,
      src: p.url,
      tags: [],
    }))[0];
  } else {
    return null
  }
}

export default async function Image({
  params
}: { params: Promise<{ id: string }> }) {
  const id = Number.parseInt((await params).id, 10)
  const image = await fetchImage(id)
  if (!image) {
    return <Container>Not Found</Container>
  }
  return (
    <Container>
      <img src={image?.src} alt='' title={image?.id} />
    </Container>
  )
}
