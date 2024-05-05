import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function IconBox() {
  return (
    <div className="card bg-blue-pink flex h-[8rem] w-[4rem] items-center justify-center">
      <div className="flex flex-col space-y-5 text-white">
        <SocialIcon kind="userprofile" href="/about" className="text-white" />
        <SocialIcon kind="github" href={siteMetadata.siteRepo} className="text-white" />
      </div>
    </div>
  )
}
