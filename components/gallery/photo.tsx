'use client'
import React from 'react'
import NextImage, { ImageProps } from 'next/image'
import { useImageOverlay } from '@/components/overlay/providers'
import loader from 'utils/image'

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

  return <NextImage loader={loader} className="lightcone" {...rest} onClick={handleClick} />
}

export default Photo
