'use client'
import useLanguages, { defaultLang, defaultLangPack } from './locale-config.js'

import { createContext, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'

type LanguageContextType = {
  currentLang: string
  setCurrentLang: React.Dispatch<React.SetStateAction<string>>
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: defaultLang,
  setCurrentLang: () => {},
})
export { LanguageContext }

const localePattern = /\/(en|zh)\//

export function LanguageProvider({ children }) {
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState(defaultLang)

  useEffect(() => {
    const currentPath = window.location.pathname
    if (localePattern.test(currentPath)) {
      const newPath = currentPath.replace(localePattern, `/${currentLang}/`)
      router.push(newPath)
    }
    setCurrentLang(currentLang)
  }, [currentLang])

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation(lang_pack: string = defaultLangPack) {
  const language = useLanguages(lang_pack)
  const translations = language.translations
  const { currentLang } = useContext(LanguageContext)
  return {
    t: (key) => {
      const value = key
        .split('.')
        .reduce(
          (previous, current) =>
            (previous && previous[current]) !== undefined ? previous[current] : undefined,
          translations[currentLang]
        )
      const translation = value !== null && value !== undefined ? value : key
      return translation
    },
  }
}
