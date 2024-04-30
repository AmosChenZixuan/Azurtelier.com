'use client'
import Link from '@/components/Link'
import useHeaderNavLinks from '@/data/headerNavLinks'
import { useTranslation } from 'utils/locale'

const MobileNav = ({ navShow, onToggleNav }) => {
  const { t } = useTranslation()

  return (
    <div
      className={`fixed inset-0 top-0 z-50 h-screen w-screen bg-white opacity-95 transition-transform duration-300 ease-in-out
        dark:bg-black sm:hidden
        ${navShow ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="mt-11 flex items-center justify-between">
        <p className="item-start ml-8 font-orbitron text-[1.5rem] font-extrabold">
          A Z <br /> U R
        </p>

        <button className="mr-8 h-8 w-8" aria-label="Toggle Menu" onClick={onToggleNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-gray-900 dark:text-gray-100"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <nav className="fixed mt-8 h-full">
        {useHeaderNavLinks(t).map((link) => (
          <div key={link.title} className="px-12 py-4">
            <Link
              href={link.href}
              className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default MobileNav
