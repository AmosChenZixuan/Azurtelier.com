'use client'
import AlbumCover from '@/components/gallery/AlbumCover'
import { Blog } from 'contentlayer/generated'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useTranslation } from 'utils/locale'

export default function PhotoAlbumLayout({ posts }) {
  const { t } = useTranslation()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('menu_album')}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('desc_album')}</p>
      </div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1280: 4 }}>
        <Masonry>
          {posts.map((post: Blog, key: number) => (
            <AlbumCover post={post} key={key} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}
