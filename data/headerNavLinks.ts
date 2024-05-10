export default function useHeaderNavLinks(translate: (key: string) => string) {
  const t = translate
  const headerNavLinks = [
    { href: '/', title: t('home_title') },
    { href: '/blog', title: t('menu_blog') },
    { href: '/album', title: t('menu_album') },
    // { href: '/tags', title: t('menu_tag') },
    { href: '/projects', title: t('menu_projects') },
    { href: '/about', title: t('menu_about') },
  ]

  return headerNavLinks
}
