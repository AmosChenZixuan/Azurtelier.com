'use client'
import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent, CoreContent } from 'pliny/utils/contentlayer'
import TypedBios from './TypedBio'
import { LanguageContext } from 'utils/locale'
import { useRef, useEffect, useContext, useState } from 'react'

export default function Page() {
  const { currentLang } = useContext(LanguageContext)
  const authorRef = useRef<Authors | null>(null)
  const mainContentRef = useRef<CoreContent<Authors> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authorRef.current = allAuthors.find((p) => p.slug === `${currentLang}/default`) as Authors
    mainContentRef.current = coreContent(authorRef.current)
    setLoading(false)
  }, [currentLang, loading])

  if (loading || !authorRef.current || !mainContentRef.current) {
    return (
      <div className="flex items-center justify-center pt-40">
        <div className="h-36 w-36 animate-spin rounded-full border-b-2 border-t-2 border-primary-400"></div>
      </div>
    )
  }

  return (
    <>
      <AuthorLayout content={mainContentRef.current}>
        <TypedBios />
        <MDXLayoutRenderer code={authorRef.current?.body.code} />
      </AuthorLayout>
    </>
  )
}
