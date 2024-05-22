import { Headline } from './Headline'
import IconBox from './IconBox'
import SearchBox from './SearchBox'
import ScrollTagsBox from './ScrollTagsBox'
import ResponsiveBox from './ResponsiveBox'

export default function DashBoard() {
  return (
    <div className="divid-y space-y-3">
      <div className="mt-6 flex justify-between space-x-3">
        <Headline />
        <div className="flex-col space-y-3">
          <IconBox />
          <SearchBox />
        </div>
      </div>

      <ResponsiveBox />

      <ScrollTagsBox />
    </div>
  )
}
