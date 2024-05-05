import ParallaxText from '@/components/scroll/ParallaxText'
import tagData from 'app/tag-data.json'
import Tag from '@/components/Tag'

export default function ScrollTagsBox() {
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
              className="mx-6 text-3xl text-white
              hover:text-primary-300 dark:text-gray-900 dark:hover:text-primary-400 xl:text-7xl"
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
    <section
      className="card bg-blue-pink mt-5 space-y-2 overflow-hidden pb-1
            font-orbitron"
    >
      {createParallaxTexts()}
    </section>
  )
}
