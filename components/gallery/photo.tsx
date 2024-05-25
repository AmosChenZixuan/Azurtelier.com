'use client'
import React, { useEffect, useState } from 'react'
import NextImage, { ImageProps } from 'next/image'
import { useImageOverlay } from '@/components/overlay/providers'

interface OverlayImageProps extends Omit<ImageProps, 'src'> {
  src?: string
  useOverlay?: boolean
  imagelist?: string[] // if imageList is provided, the src will be omitted and the imageList[index] will be used
  index?: number
}

const Photo = ({ useOverlay = true, index = 0, ...rest }: OverlayImageProps) => {
  const [displayIndex, setDisplayIndex] = useState<number>(index)
  const {
    setIsOverlayVisible,
    setImageList,
    setIndex,
    setCallerId,
    callerId,
    index: overlayIndex,
  } = useImageOverlay()

  const handleClick = () => {
    if (useOverlay) {
      setIsOverlayVisible(true)
      setImageList(rest.imagelist as string[])
      setIndex(displayIndex)
      setCallerId(rest.id || '')
    }
  }

  if (!rest.imagelist && !rest.src) {
    throw new Error('Either src or imageList must be provided')
  }
  rest.imagelist = rest.imagelist || [rest.src as string]
  rest.src = rest.imagelist[displayIndex]

  useEffect(() => {
    if (callerId == rest.id) {
      setDisplayIndex(overlayIndex)
    }
  }, [overlayIndex])

  return <NextImage src={rest.src} className="lightcone" {...rest} onClick={handleClick} />
}

export default Photo
