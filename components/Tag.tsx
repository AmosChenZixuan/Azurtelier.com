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
      className={`text-primary mr-3 hover:text-primary-400 ${className ? className : 'font-extrabold uppercase'}`}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
