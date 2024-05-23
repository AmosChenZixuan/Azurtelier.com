import Photo from '@/components/gallery/photo'
import { v4 as uuidv4 } from 'uuid'

export default function GalleryPreviewBox() {
  const imgSrc = [
    '/static/gallery/art/ai/selfie/04E5B2.jpg',
    '/static/gallery/art/ai/selfie/126348.jpg',
    '/static/gallery/art/watercolor/12810.jpg',
    '/static/gallery/art/watercolor/cb652.jpg',
  ]

  return (
    <div className={`card bg-pink-blue-animated sticky right-0 flex-grow overflow-hidden`}>
      <Photo
        id={uuidv4()}
        imagelist={imgSrc}
        alt="azuki"
        className="h-full w-full object-cover"
        width={832}
        height={1216}
      />
    </div>
  )
}
