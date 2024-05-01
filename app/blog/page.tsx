import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ParallaxText from '@/components/scroll/ParallaxText'
import tagData from 'app/tag-data.json'
import Tag from '@/components/Tag'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  // tags
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  function createParallaxTexts() {
    const tagsPerRow = 3
    const baseVelocity = 1
    const parallaxTexts: JSX.Element[] = []
    let direction = 1

    let left = 0,
      right = left + tagsPerRow
    for (; left < sortedTags.length; ) {
      const velocity = baseVelocity * direction
      direction *= -1

      parallaxTexts.push(
        <ParallaxText key={left} baseVelocity={velocity}>
          {sortedTags.slice(left, right).map((tag, j) => (
            <Tag key={j} text={tag} className="mx-6" />
          ))}
        </ParallaxText>
      )

      left = right
      right += tagsPerRow
      if (right > sortedTags.length - tagsPerRow) {
        // wrap reminder into the last row
        right = sortedTags.length
      }
    }
    return parallaxTexts
  }

  return (
    <div>
      <div className="mt-10 flex justify-between space-x-5">
        <div className="card bg-pink-blue-animated max-w-5xl overflow-hidden">
          <ParallaxText baseVelocity={0} className="-translate-x-10 -rotate-[22deg] transform">
            <span className="font-zzz text-3xl text-white">ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
          </ParallaxText>
        </div>
        <div className="flex-col space-y-5">
          <div className="card bg-light-blue-pink h-[8rem] w-[4rem]" />
          <div className="card bg-light-pink-blue h-[4rem] w-[4rem]" />
        </div>
      </div>

      <section
        className="card bg-light-blue-pink mt-5 space-y-2 overflow-hidden pb-1
        font-orbitron"
      >
        {createParallaxTexts()}
      </section>

      <ListLayout
        posts={posts}
        title=""
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </div>
  )
}
