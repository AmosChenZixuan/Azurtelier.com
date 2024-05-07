'use client'
import { FaSpotify } from 'react-icons/fa'
import { PiWaveformBold } from 'react-icons/pi'
import { RiUserHeartFill } from 'react-icons/ri'
import useSWR from 'swr'
import Link from '@/components/Link'
import Image from '@/components/Image'
import { SongData } from '@/types/spotify'
import loader from 'utils/image'

export default function SpotifyPlayerBox() {
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const { data }: { data: SongData } = useSWR('/api/spotify', fetcher)

  const limitText = (text: string, limit: number = 20) => {
    return text.length > limit ? `${text.slice(0, limit)}...` : text
  }

  return (
    <div className={`card bg-pink-blue min-w-[45%] overflow-hidden p-2`}>
      {data?.songUrl && (
        <Link href={data.songUrl} className="flex flex-col">
          <div className="flex flex-wrap space-x-1">
            <section className="relative m-1 h-24 w-24">
              <Image
                loader={loader}
                src={data.albumImageUrl}
                alt={data.album}
                width={375}
                height={375}
              />
              <div className="text-primary absolute right-0 top-0 p-1">
                <FaSpotify size={21} />
              </div>
            </section>
            <section>
              <div className=" mt-1 flex items-center space-x-1 text-primary-600">
                <PiWaveformBold size={16} />
                <span className="font-sans text-xs">
                  {data.isPlaying ? 'Now playing...' : 'Last played...'}
                </span>
              </div>
              <h1 className="break-all text-xl text-white">{limitText(data.title)}</h1>
              <div className="flex items-center space-x-1 text-white">
                <RiUserHeartFill size={16} />
                <h5 className="break-all text-sm">{limitText(data.artist)}</h5>
              </div>
            </section>
          </div>
        </Link>
      )}

      {!data?.songUrl && (
        <section className="flex flex-col items-center justify-center">
          <div className="text-primary ">
            <FaSpotify size={42} />
          </div>

          <h1 className="text-xl font-extrabold text-white">Not Playing</h1>
        </section>
      )}
    </div>
  )
}
