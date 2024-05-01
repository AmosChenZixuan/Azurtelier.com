'use client'
import { ReactNode, useContext } from 'react'
import type { Authors } from 'contentlayer/generated'
import { allAuthors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { useTranslation, LanguageContext } from 'utils/locale'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, slug } = content
  const { t } = useTranslation()
  const { currentLang } = useContext(LanguageContext)

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('menu_about')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('desc_about')}</p>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="top-12 flex flex-col items-center space-x-2 pt-8 xl:sticky">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
                priority
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-700 dark:text-gray-300">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
            <div className="mt-10">
              <hr className="my-2 w-48" />
              <b>{t('oc_title')}</b>
              <section className="flex space-x-2">
                {allAuthors
                  .filter(
                    (author) => author.slug.startsWith(`${currentLang}`) && author.name != name
                  )
                  .map((author) => (
                    <Link key={author.name} href={`/about/${author.slug}`}>
                      <Image
                        src={author.avatar || ''}
                        alt={author.name}
                        width={72}
                        height={72}
                        className="h-12 w-12 rounded-full"
                        priority
                      />
                    </Link>
                  ))}
              </section>
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
