import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
  className?: string
}

const Tag = ({ text, className }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`mr-3 ${className ? className : 'text-primary font-extrabold uppercase hover:text-primary-400 '}`}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
