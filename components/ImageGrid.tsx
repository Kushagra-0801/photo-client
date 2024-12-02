'use client'
import React, { useEffect, useRef, useState } from "react"

import ImageCard from '@/components/ImageCard'
import type { ImageData } from "@/app/lib/definitions";
import { getLibrary } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default function ImageGrid() {
  const [images, setImages] = useState<ImageData[]>([]);
  const lastCard = useRef(null);
  useEffect(() => {
    let ignore = false;
    (async () => {
      const imgs = await getLibrary();
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
          ? <ImageCard key={i.name} {...i} ref={lastCard} />
          : <ImageCard key={i.name} {...i} />)
      }
    </div>
  )
}
