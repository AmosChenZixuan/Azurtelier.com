import { Headline } from './Headline'
import IconBox from './IconBox'
import SearchBox from './SearchBox'
import SpotifyPlayerBox from './SpotifyPlayerBox'
import GithubActivityBox from './GithubActivityBox'
import ScrollTextBox from './ScrollTextBox'
import ScrollTagsBox from './ScrollTagsBox'
import GalleryPreviewBox from './GalleryPreviewBox'

export default function DashBoard() {
  const sm_row = 'flex space-x-5'
  const sm_col = 'flex flex-col space-y-5'
  const md_row = 'md:flex-row md:space-x-5 md:space-y-0'
  const md_col = 'md:flex-col md:space-y-5 md:space-x-0'

  return (
    <div className="divid-y space-y-5">
      <div className="mt-6 flex justify-between space-x-5">
        <Headline />
        <div className="flex-col space-y-5">
          <IconBox />
          <SearchBox />
        </div>
      </div>

      <section className="mt-5 flex justify-between space-x-5 overflow-hidden">
        <div className={`${sm_col} ${md_row} flex-grow justify-between`}>
          <div className={`${sm_row} ${md_col}`}>
            <SpotifyPlayerBox />
            <ScrollTextBox />
          </div>
          <GithubActivityBox />
        </div>
        <GalleryPreviewBox />
      </section>

      <ScrollTagsBox />
    </div>
  )
}
