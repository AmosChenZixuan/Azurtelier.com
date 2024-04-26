'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import siteMetadata from '@/data/siteMetadata'
import useHeaderNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

import LocaleSwitch from './LocaleSwitch'
import { useTranslation } from 'utils/locale'

const Header = () => {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.header
      className={`fixed left-0 right-0 top-2 z-50 mx-auto
        rounded-md bg-white/30 py-2 pl-2
        pr-4 ${isScrolled ? 'shadow-md' : ''} backdrop-blur dark:bg-black/30 dark:shadow-gray-800`}
      initial={{ width: '100vw' }}
      animate={{ width: isScrolled ? '80vw' : '100vw' }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-3">
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
          <div className="flex items-center justify-between">
            <div className="mr-3 hidden md:block">
              <Image src="/static/images/logo.png" width="200" height="44" alt="logo" priority />
            </div>
            <div className="mr-3 block md:hidden">
              <Image src="/static/favicons/icon.png" width="44" height="44" alt="logo" priority />
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
                className="hidden font-medium
              text-gray-900 transition duration-300 hover:text-primary-500 dark:text-gray-100
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
        {/* <div className="absolute inset-x-0 middle-y-0 border-t border-gray-300"></div> */}
      </div>
    </motion.header>
  )
}

export default Header
