'use client'
import { useContext } from 'react'
// import { useEffect, useState } from 'react'
import { LanguageContext } from 'utils/locale'

const ThemeSwitch = () => {
  const { currentLang, setCurrentLang } = useContext(LanguageContext)

  // When mounted on client, now we can show the UI
  //   useEffect(() => setMounted(true), [])

  const chinese = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" stroke="currentColor">
      <text x="50%" y="60%" text-anchor="middle" dominant-baseline="middle" font-size="30">
        文
      </text>
    </svg>
  )

  const english = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" stroke="currentColor">
      <text x="50%" y="60%" text-anchor="middle" dominant-baseline="middle" font-size="30">
        En
      </text>
    </svg>
  )

  return (
    <button
      aria-label="Toggle Language"
      className="flex w-8 items-center justify-center p-1"
      onClick={() => setCurrentLang(currentLang === 'zh' ? 'en' : 'zh')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mb-1 h-5 w-5 text-gray-900 dark:text-gray-100"
      >
        {/* {mounted && (theme === 'dark' || currentLang === 'dark') ? Sun() : Moon()} */}
        {currentLang === 'zh' ? english() : chinese()}
      </svg>
    </button>
  )
}

export default ThemeSwitch
