'use client'
import { IoClose } from 'react-icons/io5'
import { useTranslation } from 'utils/locale'
import { useImageOverlay } from './providers'
import ReactiveImage from './ReactiveImage'

const ImageViewOverlay: React.FC = () => {
  const { overlayImage, isOverlayVisible, setIsOverlayVisible } = useImageOverlay()
  const { t } = useTranslation()

  // render
  if (!isOverlayVisible || !overlayImage) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-90">
      <ReactiveImage imageSrc={overlayImage} isEnabled={isOverlayVisible} />

      <button onClick={() => setIsOverlayVisible(false)} className="absolute right-4 top-4">
        <IoClose size={30} color={'#fff'} />
      </button>

      <span className="absolute bottom-1 -z-10 text-gray-200 opacity-70 ">
        <h5 className="hidden md:block">{t('img_overlay_hint')}</h5>
        <h5 className="md:hidden">{t('img_overlay_hint_mobile')}</h5>
      </span>
    </div>
  )
}

export default ImageViewOverlay
