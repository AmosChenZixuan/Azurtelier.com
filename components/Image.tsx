import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => (
  <NextImage
    className="rounded-md border-2 border-gray-300 shadow-xl dark:border-gray-800 dark:shadow-gray-800"
    {...rest}
  />
)

export default Image
