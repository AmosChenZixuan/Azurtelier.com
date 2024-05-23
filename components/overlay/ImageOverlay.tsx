'use client'
import NextImage from 'next/image'
import { IoClose } from 'react-icons/io5'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { useTranslation } from 'utils/locale'
import { useImageOverlay } from './providers'
import ReactiveDiv from './ReactiveDiv'
import { useEffect, useState } from 'react'
import Spinner from '@/components/Spinner'

const ImageViewOverlay: React.FC = () => {
  const { isOverlayVisible, setIsOverlayVisible, imageList, index, setIndex } = useImageOverlay()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isOverlayVisible) return
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault() // prevent scrolling from arrow keys
      switch (event.key) {
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  // render
  if (!isOverlayVisible || !imageList) {
    return null
  }

  const nImages = imageList.length
  const nextImage = () => {
    if (nImages <= 1) return
    setIsLoading(true)
    setIndex((prevIndex) => (prevIndex + 1) % nImages)
  }

  const prevImage = () => {
    if (nImages <= 1) return
    setIsLoading(true)
    setIndex((prevIndex) => (prevIndex - 1 + nImages) % nImages)
  }

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-90">
      {isLoading && (
        <div className="absolute right-4 top-4 z-10">
          <Spinner size={30} />
        </div>
      )}
      <ReactiveDiv isEnabled={isOverlayVisible} className="absolute left-0 right-0 top-0 h-screen">
        <NextImage
          src={imageList[index as number]}
          alt="overlay"
          fill
          className="mt-0 py-10"
          style={{
            objectFit: 'contain',
          }}
          onDragStart={(e) => e.preventDefault()}
          onLoad={() => setIsLoading(false)}
        />
      </ReactiveDiv>

      <button onClick={() => setIsOverlayVisible(false)} className="absolute right-4 top-4 z-50">
        <IoClose size={30} color={'#fff'} />
      </button>

      {nImages > 1 && (
        <div className="z-20 text-primary-50 ">
          <button
            onClick={prevImage}
            className="absolute bottom-0 left-0 my-auto h-1/6 bg-black/20 px-10 md:top-0"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextImage}
            className="absolute bottom-0 right-0 my-auto h-1/6 bg-black/20 px-10 md:top-0"
          >
            <GrNext />
          </button>
        </div>
      )}

      <span className="absolute bottom-1 -z-10 text-gray-200 opacity-70 ">
        <h5 className="hidden md:block">{t('img_overlay_hint')}</h5>
        <h5 className="md:hidden">{t('img_overlay_hint_mobile')}</h5>
      </span>
    </div>
  )
}

export default ImageViewOverlay
