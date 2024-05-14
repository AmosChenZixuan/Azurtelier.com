import { Blog } from 'contentlayer/generated'
import Link from 'next/link'
import Tag from '@/components/Tag'
import Photo from './photo'

interface AlbumCoverProps {
  post: Blog
}

export default function AlbumCover({ post }: AlbumCoverProps) {
  return (
    <div className="group relative m-2 overflow-hidden rounded-xl">
      <section className="absolute bottom-0 left-0 z-10 w-full bg-black bg-opacity-50 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Link href={post.path}>
          <h2 className="text-lg font-bold text-primary-50">{post.title}</h2>
        </Link>
        <div className="flex flex-wrap">
          {post.tags?.map((tag) => (
            <Tag key={tag} text={tag} className="text-primary mr-1 rounded-xl border p-1 text-sm" />
          ))}
        </div>
      </section>
      <Photo
        src=""
        index={0}
        imagelist={post.images}
        alt={post.images[0]}
        width={1000}
        height={1000}
        className="transform-scale rounded-xl duration-300 group-hover:scale-[1.1]"
      />
    </div>
  )
}
