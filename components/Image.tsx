import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => <NextImage className="lightcone" {...rest} />

export default Image
