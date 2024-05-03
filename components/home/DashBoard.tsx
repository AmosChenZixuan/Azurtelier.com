import { Headline } from './Headline'
import IconBox from './IconBox'
import SearchBox from './SearchBox'
import SpotifyPlayerBox from './SpotifyPlayerBox'
import GithubActivityBox from './GithubActivityBox'
import ScrollTextBox from './ScrollTextBox'
import ScrollTagsBox from './ScrollTagsBox'
import GalleryPreviewBox from './GalleryPreviewBox'

export default function DashBoard() {
  return (
    <div className="divid-y space-y-5">
      <div className="mt-6 flex justify-between space-x-5">
        <Headline />
        <div className="flex-col space-y-5">
          <IconBox />
          <SearchBox />
        </div>
      </div>

      <div className="mt-5 flex justify-between space-x-5">
        <div className="flex-col space-y-5">
          <SpotifyPlayerBox />
          <ScrollTextBox />
        </div>
        <GithubActivityBox />
        <GalleryPreviewBox />
      </div>

      <ScrollTagsBox />
    </div>
  )
}
