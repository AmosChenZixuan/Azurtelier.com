import { NextResponse } from 'next/server'

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

interface SpotifyData {
  is_playing: boolean
  item: {
    name: string
    album: {
      name: string
      artists: Array<{ name: string }>
      images: [{ url: string }]
    }
    external_urls: {
      spotify: string
    }
  }
  currently_playing_type: string
}

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

async function getSpotifyNowPlaying() {
  const { access_token } = await getAccessToken()

  const url = new URL(NOW_PLAYING_ENDPOINT)

  url.searchParams.append('additional_types', 'track,episode')

  return fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const GET = async () => {
  const response = await getSpotifyNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false }, { status: response.status })
  }

  const data: SpotifyData = await response.json()

  if (data?.currently_playing_type === 'episode') {
    return NextResponse.json(
      {
        isPlaying: true,
        title: data.item.name,
        songUrl: data.item.external_urls.spotify,
      },
      { status: 200 }
    )
  }

  const songData = {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.album.artists.map((art: { name: string }) => art.name).join(', '),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images[0]?.url,
    songUrl: data.item.external_urls.spotify,
  }

  return NextResponse.json(songData, { status: 200 })
}
