import Link from '@/components/Link'
import Image from '@/components/Image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-start xl:mt-24 xl:flex-row xl:items-center xl:justify-center xl:space-x-6">
      <div className="flex flex-col items-center space-x-2 pb-8 pt-6">
        <Image
          src="/static/images/404.jpeg"
          width={512}
          height={512}
          className="h-80 w-80"
          alt="404"
        ></Image>
      </div>
      <div className="max-w-xl xl:border-l-2 xl:pl-20">
        <p className="mb-4 text-xl font-bold leading-normal xl:text-2xl">
          404: This page is not available yet.
        </p>
        <p className="mb-8">But dont worry, let me take you back to our homepage.</p>
        <Link
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
