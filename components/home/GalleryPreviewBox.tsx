import Photo from '@/components/gallery/photo'

export default function GalleryPreviewBox() {
  const imgSrc = process.env.HOME_DISPLAY_IMG_URL || '/static/gallery/art/ai/selfie/04E5B2.jpg'

  return (
    <div className={`card bg-pink-blue-animated sticky right-0 flex-grow overflow-hidden`}>
      <Photo
        src={imgSrc}
        alt="azuki"
        className="h-full w-full object-cover"
        width={832}
        height={1216}
      />
    </div>
  )
}
