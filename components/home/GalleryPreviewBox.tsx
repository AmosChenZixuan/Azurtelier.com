import Photo from '@/components/gallery/photo'

export default function GalleryPreviewBox() {
  const imgSrc =
    'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/ce77d24d-f83e-4753-bb9a-e11337373a14/original=true/04E5B2C2B11B877768CDA1F3850C3CEE8B3A3C1F38C4757E3A1E86640A7A72F0.jpeg'

  return (
    <div
      className={`card bg-pink-blue-animated sticky right-0 max-w-[25%] flex-grow overflow-hidden`}
    >
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
