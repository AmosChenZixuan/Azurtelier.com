export interface SongData {
  isPlaying: boolean
  title: string
  artist: string
  album: string
  albumImageUrl: string
  songUrl: string
}

export interface SpotifyTrack {
  name: string
  artists: Array<{ name: string }>
  album: {
    name: string
    images: [{ url: string }]
  }
  external_urls: {
    spotify: string
  }
}

export interface SpotifyNowPlayingData {
  is_playing: boolean
  item: SpotifyTrack
  currently_playing_type: string
}

export interface SpotifyRecentPlayedData {
  items: [
    {
      track: SpotifyTrack
    },
  ]
}
