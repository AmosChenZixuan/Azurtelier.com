import { parse } from 'url'
import type { UrlWithParsedQuery } from 'url'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { query }: UrlWithParsedQuery = parse(req.url || '', true)

  if (!query) {
    return NextResponse.json({ message: 'Query parameters are required' }, { status: 400 })
  }

  const url = query.url as string

  if (!url) {
    return NextResponse.json({ message: 'URL is required' }, { status: 400 })
  }

  try {
    const imageResponse = await fetch(url)
    const imageBuffer = await imageResponse.arrayBuffer()
    const contentType = imageResponse.headers.get('content-type') || ''

    return new NextResponse(Buffer.from(imageBuffer), {
      headers: { 'Content-Type': contentType },
      status: imageResponse.status,
    })
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
