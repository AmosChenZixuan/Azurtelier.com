import {
  SongData,
  SpotifyNowPlayingData,
  SpotifyRecentPlayedData,
  SpotifyTrack,
} from '@/types/spotify'
import { NextResponse } from 'next/server'

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const RECENT_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    cache: 'no-cache',
  })

  return response.json()
}

async function fetchSpotifyData(
  endpoint: string,
  params: Record<string, string>
): Promise<Response> {
  const { access_token } = await getAccessToken()

  const url = new URL(endpoint)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value)
  }

  return fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

function getSpotifyNowPlaying(): Promise<Response> {
  return fetchSpotifyData(NOW_PLAYING_ENDPOINT, { additional_types: 'track' })
}

function getSpotifyRecentPlayed(): Promise<Response> {
  return fetchSpotifyData(RECENT_PLAYED_ENDPOINT, { limit: '1' })
}

function createSongData(track: SpotifyTrack, isPlaying: boolean): SongData {
  return {
    isPlaying: isPlaying,
    title: track.name,
    artist: track.artists.map((art: { name: string }) => art.name).join(', '),
    album: track.album.name,
    albumImageUrl: track.album.images[0]?.url,
    songUrl: track.external_urls.spotify,
  }
}

async function fallBackLastPlayed() {
  return getSpotifyRecentPlayed().then((response) => {
    if (!response.ok) {
      throw new SpotifyApiError(response.status, response.statusText)
    }
    return response.json()
  })
}

export const GET = async () => {
  return getSpotifyNowPlaying()
    .then((response) => {
      if (!response.ok) {
        throw new SpotifyApiError(response.status, response.statusText)
      } else if (response.status === 204) {
        return fallBackLastPlayed()
      }
      return response.json()
    })
    .then((data: SpotifyNowPlayingData | SpotifyRecentPlayedData) => {
      let songData: SongData
      if ('is_playing' in data) {
        songData = createSongData(data.item, data.is_playing)
      } else {
        songData = createSongData(data.items[0].track, false)
      }
      return NextResponse.json(songData, { status: 200 })
    })
    .catch((error) => {
      return NextResponse.json({ isPlaying: false }, { status: error.status })
    })
}

class SpotifyApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}
