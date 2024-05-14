'use client'
import React from 'react'
import NextImage, { ImageProps } from 'next/image'
import { useImageOverlay } from '@/components/overlay/providers'

interface OverlayImageProps extends ImageProps {
  useOverlay?: boolean
  imagelist?: string[] // if imageList is provided, the src will be omitted and the imageList[index] will be used
  index?: number
}

const Photo = ({ useOverlay = true, index = 0, ...rest }: OverlayImageProps) => {
  const { setIsOverlayVisible, setImageList, setIndex } = useImageOverlay()

  const handleClick = () => {
    if (useOverlay) {
      setIsOverlayVisible(true)
      setImageList(rest.imagelist as string[])
      setIndex(index)
    }
  }

  if (!rest.imagelist && !rest.src) {
    throw new Error('Either src or imageList must be provided')
  }
  rest.imagelist = rest.imagelist || [rest.src as string]
  rest.src = rest.imagelist ? rest.imagelist[index] : rest.src

  return <NextImage className="lightcone" {...rest} onClick={handleClick} />
}

export default Photo
