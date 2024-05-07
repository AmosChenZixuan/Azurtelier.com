const loader = ({ src }) => {
  if (src.startsWith('/static')) return src
  return `/api/imageProxy?url=${encodeURIComponent(src)}`
}

export default loader
