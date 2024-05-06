'use client'
import { Authors, allAuthors } from 'contentlayer/generated'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent, CoreContent } from 'pliny/utils/contentlayer'
import TypedBios from './TypedBio'
import { LanguageContext } from 'utils/locale'
import { useRef, useEffect, useContext } from 'react'
// import { genPageMetadata } from 'app/seo'

// export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const { currentLang } = useContext(LanguageContext)
  const authorRef = useRef<Authors | null>(null)
  const mainContentRef = useRef<CoreContent<Authors> | null>(null)

  authorRef.current = allAuthors.find((p) => p.slug === `${currentLang}/default`) as Authors
  mainContentRef.current = coreContent(authorRef.current)

  useEffect(() => {
    return () => {
      authorRef.current = allAuthors.find((p) => p.slug === `${currentLang}/default`) as Authors
      mainContentRef.current = coreContent(authorRef.current)
    }
  }, [currentLang])

  return (
    <>
      <AuthorLayout content={mainContentRef.current}>
        <TypedBios />
        <MDXLayoutRenderer code={authorRef.current?.body.code} components={components} />
      </AuthorLayout>
    </>
  )
}
