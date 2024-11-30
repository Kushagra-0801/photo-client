import React, { forwardRef } from 'react'
import Image from 'next/image'

import type { ImageData } from "@/app/lib/definitions";

export default forwardRef<HTMLImageElement, ImageData>(function ImageCard(props, ref) {
  return (<Image src={props.src} alt={''} title={props.id} width={300} height={300} ref={ref} />)
})
