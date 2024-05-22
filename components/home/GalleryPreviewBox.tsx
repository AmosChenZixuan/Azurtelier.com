import Photo from '@/components/gallery/photo'

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
        imagelist={imgSrc}
        alt="azuki"
        className="h-full w-full object-cover"
        width={832}
        height={1216}
      />
    </div>
  )
}
