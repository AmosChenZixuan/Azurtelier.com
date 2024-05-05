/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import tagData from 'app/tag-data.json'
import { useTranslation, LanguageContext } from 'utils/locale'
import { useContext } from 'react'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  const { t } = useTranslation()

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('btn_prev')}
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            {t('btn_prev')}
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('btn_next')}
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            {t('btn_next')}
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const { t } = useTranslation()
  const currentLang = useContext(LanguageContext).currentLang

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('blog_title')}
          </h1>
        </div>
        <div className="flex sm:space-x-12">
          <div className="card hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto border bg-gray-50 pt-5 dark:bg-gray-900/70 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">{t('blog_title')}</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  {t('blog_title')}
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {pathname.split('/tags/')[1] === slug(t) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="w-full">
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="transform duration-300 hover:scale-[1.02]">
                    <section className="card mb-5 border p-5">
                      <article className="flex flex-col space-y-2 xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, currentLang)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-3">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                      </article>
                    </section>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
