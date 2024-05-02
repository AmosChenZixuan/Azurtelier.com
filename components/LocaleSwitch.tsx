'use client'
import { useContext } from 'react'
// import { useEffect, useState } from 'react'
import { LanguageContext } from 'utils/locale'

const ThemeSwitch = () => {
  const { currentLang, setCurrentLang } = useContext(LanguageContext)

  // When mounted on client, now we can show the UI
  //   useEffect(() => setMounted(true), [])

  return (
    <button
      aria-label="Toggle Language"
      className={`flex w-8 items-center justify-center rounded border-2 p-1 ${currentLang === 'zh' ? 'border-gray-700' : 'border-transparent'} transform duration-500`}
      onClick={() => setCurrentLang(currentLang === 'zh' ? 'en' : 'zh')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5 text-gray-900 dark:text-gray-100"
      >
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <rect x="0" fill="none" width="20" height="20"></rect>{' '}
            <g>
              <path d="M11 7H9.49c-.63 0-1.25.3-1.59.7L7 5H4.13l-2.39 7h1.69l.74-2H7v4H2c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v2zM6.51 9H4.49l1-2.93zM10 8h7c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2zm7.25 5v-1.08h-3.17V9.75h-1.16v2.17H9.75V13h1.28c.11.85.56 1.85 1.28 2.62-.87.36-1.89.62-2.31.62-.01.02.22.97.2 1.46.84 0 2.21-.5 3.28-1.15 1.09.65 2.48 1.15 3.34 1.15-.02-.49.2-1.44.2-1.46-.43 0-1.49-.27-2.38-.63.7-.77 1.14-1.77 1.25-2.61h1.36zm-3.81 1.93c-.5-.46-.85-1.13-1.01-1.93h2.09c-.17.8-.51 1.47-1 1.93l-.04.03s-.03-.02-.04-.03z"></path>{' '}
            </g>{' '}
          </g>
        </svg>
      </svg>
    </button>
  )
}

export default ThemeSwitch
