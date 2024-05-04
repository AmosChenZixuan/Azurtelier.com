import { FaSpotify } from 'react-icons/fa'

export default function SpotifyPlayerBox() {
  return (
    <div
      className={`card bg-pink-blue-animated animation-delay-1 flex-center flex-grow flex-col space-y-2 overflow-hidden p-2`}
    >
      <div className="text-primary">
        <FaSpotify size={42} />
      </div>
      <h1 className="font-zzz2 text-white">Spotify Player</h1>
      <p className="font-zzz2 text-white">Coming Soon</p>
    </div>
  )
}
