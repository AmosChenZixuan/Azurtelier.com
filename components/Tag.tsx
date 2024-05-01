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
      className={`mr-3 text-primary-300 hover:text-primary-500 ${className ? className : 'font-medium uppercase'}`}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
