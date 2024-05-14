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
      className={`${className ? className : 'text-primary mr-3 font-extrabold uppercase hover:text-primary-400'}`}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
