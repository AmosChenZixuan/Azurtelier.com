'use client'
import siteMetadata from '@/data/siteMetadata'
import useHeaderNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

import LocaleSwitch from './LocaleSwitch'
import { useTranslation } from "utils/locale"

const Header = () => {
  const {t} = useTranslation()

  return (
    <header
      className="fixed left-0 right-0 top-2 z-50 mx-auto max-w-5xl
    rounded-full bg-white/30 px-8
    py-2 shadow-md backdrop-blur dark:bg-black/30 dark:shadow-gray-800"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image src="/static/images/logo.png" width="200" height="1" alt="logo" />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {useHeaderNavLinks(t)
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hidden font-medium text-gray-900 transition duration-300
              hover:text-primary-500 dark:text-gray-100
              dark:hover:text-primary-500 sm:block"
              >
                {link.title}
              </Link>
            ))}
          <SearchButton />
          <ThemeSwitch />
          <LocaleSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
