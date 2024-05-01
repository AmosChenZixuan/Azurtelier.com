import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => (
  <NextImage className="card border-2 border-gray-300 dark:border-gray-800" {...rest} />
)

export default Image
