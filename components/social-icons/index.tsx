import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Mastodon,
  Threads,
  Instagram,
  UserProfile,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
  userprofile: UserProfile,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
  className?: string
}

const SocialIcon = ({ kind, href, size = 8, className }: SocialIconProps) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current ${className ? className : 'text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400'} h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
