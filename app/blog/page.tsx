import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ParallaxText from '@/components/scroll/ParallaxText'
import tagData from 'app/tag-data.json'
import Tag from '@/components/Tag'
import SearchButton from '@/components/SearchButton'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

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
            <Tag
              key={j}
              text={tag}
              className="mx-6 text-white hover:text-primary-300
              dark:text-gray-900 dark:hover:text-primary-400"
            />
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
      <div className="mt-6 flex justify-between space-x-5">
        <div className="card bg-pink-blue-animated relative max-w-5xl overflow-hidden">
          <ParallaxText
            baseVelocity={0}
            className="-translate-x-[1rem] -translate-y-[1rem] -rotate-[10deg] transform"
          >
            <span className="font-zzz text-3xl text-white">WelcomeToMyBlogPage!</span>
          </ParallaxText>
          <p className="absolute bottom-8 right-8 mt-[5rem] font-zzz2 text-3xl text-white">
            {' '}
            Work Hard, Dream Big
          </p>
        </div>
        <div className="flex-col space-y-5">
          <div className="card bg-light-blue-pink flex h-[8rem] w-[4rem] items-center justify-center">
            <div className="flex flex-col space-y-5 text-white">
              <SocialIcon kind="userprofile" href="/about" className="text-white" />
              <SocialIcon kind="github" href={siteMetadata.siteRepo} className="text-white" />
            </div>
          </div>
          <div className="card bg-light-pink-blue relative flex h-[4rem] w-[4rem] items-center justify-center">
            <div className="absolute m-auto scale-[1.7] transform">
              <SearchButton />
            </div>
          </div>
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
