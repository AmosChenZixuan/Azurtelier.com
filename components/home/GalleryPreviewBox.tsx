import Link from '@/components/Link'
import Image from '@/components/Image'
import Photo from '@/components/gallery/photo'

export default function GalleryPreviewBox() {
  return (
    <div
      className={`card bg-pink-blue-animated sticky right-0 min-w-[4rem] max-w-[25%] flex-grow overflow-hidden`}
    >
      <Photo
        src="/static/gallary/art/ai/azuki/charming_smile.jpeg"
        alt="azuki"
        className="h-full w-full object-cover"
        width={832}
        height={1216}
        useOverlay
      />
    </div>
  )
}
