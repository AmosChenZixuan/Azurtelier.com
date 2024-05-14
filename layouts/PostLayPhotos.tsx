'use client'
import { Key, ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import PostLayout from './PostLayout'
import Photo from '@/components/gallery/photo'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostPhotos({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { images } = content

  return (
    <PostLayout content={content} authorDetails={authorDetails} next={next} prev={prev}>
      {children}
      <section className="divide-y divide-transparent">
        {images &&
          images.map((image: string, i: number) => (
            <Photo
              key={i}
              src=""
              imagelist={images}
              index={i}
              alt={image}
              width={1920}
              height={1024}
            />
          ))}
      </section>
    </PostLayout>
  )
}
