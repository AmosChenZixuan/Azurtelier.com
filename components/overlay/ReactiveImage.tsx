'use client'
import { useEffect, useRef, useState } from 'react'
import NextImage from 'next/image'

interface ReactiveImageProps {
  imageSrc: string
  isEnabled: boolean
}

const ReactiveImage: React.FC<ReactiveImageProps> = ({ imageSrc, isEnabled }) => {
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  // scroll zooming
  const handleScroll = (e: WheelEvent) => {
    e.preventDefault()

    setZoom((prevZoom) => {
      const nextZoom = prevZoom - e.deltaY * 0.005
      return Math.min(10, Math.max(1, nextZoom))
    })
  }

  useEffect(() => {
    if (isEnabled) {
      setPosition({ x: 0, y: 0 })
      setZoom(1)
      window.addEventListener('wheel', handleScroll, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [isEnabled])

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

  // dragging on touch devices
  const ref = useRef<HTMLDivElement | null>(null)
  const [initialDistance, setInitDist] = useState(0)

  function getDistance(touch1: Touch, touch2: Touch) {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault()

    setDragging(true)
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    if (e.touches.length > 1) {
      // pinch zoom
      setInitDist(getDistance(e.touches[0], e.touches[1]))
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if (dragging) {
      setPosition((prevPos) => ({
        x: prevPos.x + e.touches[0].clientX - startPos.x,
        y: prevPos.y + e.touches[0].clientY - startPos.y,
      }))
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
    if (e.touches.length > 1) {
      // pinch zoom
      const distance = getDistance(e.touches[0], e.touches[1])
      const scale = distance / initialDistance
      console.log(distance, initialDistance)
      setZoom((prevZoom) => {
        const nextZoom = prevZoom * scale
        return Math.min(10, Math.max(1, nextZoom))
      })

      setInitDist(distance)
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
  }

  // add touch event listeners for mobile devices
  useEffect(() => {
    const element = ref.current

    if (element) {
      element.addEventListener('touchstart', handleTouchStart, { passive: false })
      element.addEventListener('touchend', handleTouchEnd, { passive: false })
      element.addEventListener('touchmove', handleTouchMove, { passive: false })

      return () => {
        element.removeEventListener('touchstart', handleTouchStart)
        element.removeEventListener('touchend', handleTouchEnd)
        element.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [handleTouchStart, handleTouchEnd, handleTouchMove])

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-0 h-screen"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      role="none"
    >
      <NextImage
        src={imageSrc}
        alt="overlay"
        fill
        className="mt-0 py-10"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          objectFit: 'contain',
        }}
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  )
}

export default ReactiveImage
