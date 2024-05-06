'use client'
import React from 'react'
import NextImage, { ImageProps } from 'next/image'
import { useImageOverlay } from '@/components/overlay/providers'

interface OverlayImageProps extends ImageProps {
  useOverlay?: boolean
}

const Photo = ({ useOverlay = true, ...rest }: OverlayImageProps) => {
  const { setOverlayImage, setIsOverlayVisible } = useImageOverlay()

  const handleClick = () => {
    if (useOverlay) {
      setOverlayImage(rest.src as string)
      setIsOverlayVisible(true)
    }
  }

  return <NextImage className="lightcone" {...rest} onClick={handleClick} />
}

export default Photo
