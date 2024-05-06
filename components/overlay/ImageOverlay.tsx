'use client'
import React, { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { IoClose } from 'react-icons/io5'
import { useTranslation } from 'utils/locale'
import { useImageOverlay } from './providers'

const ImageViewOverlay: React.FC = () => {
  const { overlayImage, isOverlayVisible, setIsOverlayVisible } = useImageOverlay()
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const { t } = useTranslation()

  // dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setPosition((prevPos) => ({
        x: prevPos.x + e.clientX - startPos.x,
        y: prevPos.y + e.clientY - startPos.y,
      }))
      setStartPos({ x: e.clientX, y: e.clientY })
    }
  }

  // zooming
  const handleScroll = (e: WheelEvent) => {
    e.preventDefault()

    setZoom((prevZoom) => {
      const nextZoom = prevZoom - e.deltaY * 0.005
      return Math.min(10, Math.max(1, nextZoom))
    })
  }

  useEffect(() => {
    if (isOverlayVisible) {
      setPosition({ x: 0, y: 0 })
      setZoom(1)
      window.addEventListener('wheel', handleScroll, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [isOverlayVisible])

  if (!isOverlayVisible || !overlayImage) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-90">
      <div
        className="absolute left-0 right-0 top-0 h-screen"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        role="none"
      >
        <NextImage
          src={overlayImage}
          alt="overlay"
          objectFit="contain"
          fill
          className="mt-0 py-10"
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <button onClick={() => setIsOverlayVisible(false)} className="absolute right-4 top-4">
        <IoClose size={30} color={'#fff'} />
      </button>

      <h5 className="absolute bottom-1 -z-10 text-gray-200 opacity-70">{t('img_overlay_hint')}</h5>
    </div>
  )
}

export default ImageViewOverlay
