'use client'
import { useMediaQuery } from 'react-responsive'
import SpotifyPlayerBox from './SpotifyPlayerBox'
import GithubActivityBox from './GithubActivityBox'
import ScrollTextBox from './ScrollTextBox'
import GalleryPreviewBox from './GalleryPreviewBox'

export default function ResponsiveBox() {
  const isXs = useMediaQuery({ query: '(max-width: 480px)' })
  const isMd = useMediaQuery({ query: '(min-width: 768px)' })

  const flex_row = 'flex-row space-x-3'
  const flex_col = 'flex-col space-y-3'

  function getLayout(xs: string, sm: string, md: string) {
    if (isXs) {
      return xs
    } else if (isMd) {
      return md
    }
    return sm
  }

  return (
    <section className={`mt-3 flex justify-between ${getLayout(flex_col, flex_row, flex_row)}`}>
      <div
        className={`flex flex-grow justify-between ${getLayout(flex_col, flex_col, flex_row)} min-w-[75%]`}
      >
        <div className={`flex ${getLayout(flex_row, flex_row, flex_col)} min-w-[45%]`}>
          <SpotifyPlayerBox />
          <ScrollTextBox />
        </div>
        <GithubActivityBox />
      </div>
      <GalleryPreviewBox />
    </section>
  )
}
