import Link from '@/components/Link'
import Image from '@/components/Image'

export default function GalleryPreviewBox() {
  return (
    <div
      className={`card bg-pink-blue-animated sticky right-0 min-w-[4rem] max-w-[25%] flex-grow overflow-hidden`}
    >
      <Link href="https://civitai.com/user/Azurtelier">
        <Image
          src="/static/gallary/art/ai/azuki/charming_smile.jpeg"
          alt="azuki"
          className="h-full w-full object-cover"
          width={832}
          height={1216}
        />
      </Link>
    </div>
  )
}
