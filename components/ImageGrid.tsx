'use client'
import React, { useEffect, useRef, useState } from "react"

import ImageCard from '@/components/ImageCard'
import type { ImageData } from "@/app/lib/definitions";

export const dynamic = 'force-dynamic'

const fetchImages = async (page: number): Promise<ImageData[]> => {
  const res = await fetch('https://api.slingacademy.com/v1/sample-data/photos').then(r => r.json());
  if (res.success) {
    return res.photos.map((p: { id: number; url: string; }) => ({
      id: `${p.id}`,
      src: p.url,
      tags: [],
    }));
  } else {
    return []
  }
}

export default function ImageGrid() {
  const [images, setImages] = useState<ImageData[]>([]);
  const lastCard = useRef(null);
  useEffect(() => {
    let ignore = false;
    (async () => {
      const imgs = await fetchImages(0);
      if (!ignore) {
        setImages(imgs);
      }
    }
    )()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
      {
        images.map((i, idx) => idx === images.length - 1
          ? <ImageCard key={i.id} {...i} ref={lastCard} />
          : <ImageCard key={i.id} {...i} />)
      }
    </div>
  )
}
