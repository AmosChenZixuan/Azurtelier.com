'use client'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

export default function PlogPage() {
  const images = [
    'public/static/gallery/art/ai/selfie/3fe904.png',
    'public/static/gallery/art/ai/selfie/04E5B2.jpg',
    'public/static/gallery/art/ai/selfie/75A575.jpg',
    'public/static/gallery/art/ai/selfie/205dc9.png',
    'public/static/gallery/view/oslo_light_from_haven.jpg',
    'public/static/gallery/art/ai/selfie/126348.png',
    'public/static/gallery/art/ai/selfie/a095eb.png',
    'public/static/images/404.jpeg',
    'public/static/images/azuki_banner.png',
  ]

  console.log(images)
  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1280: 4 }}>
        <Masonry>
          {images.map((image, index) => {
            return (
              <div key={index} className="m-2">
                <img src={image.replace('public', '')} alt={image} className="rounded-xl" />
              </div>
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}
