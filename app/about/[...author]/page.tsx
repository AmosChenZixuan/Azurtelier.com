import { Authors, allAuthors } from 'contentlayer/generated'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'

export const generateStaticParams = async () => {
  const paths = allAuthors.map((p) => ({ author: p.slug.split('/') }))
  return paths
}

export default async function Page({ params }: { params: { author: string[] } }) {
  const locale = params.author[0]
  const name = params.author[1]

  const authorPage = allAuthors.find((p) => p.slug === `${locale}/${name}`) as Authors
  const mainContent = coreContent(authorPage)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={authorPage.body.code} components={components} />
      </AuthorLayout>
    </>
  )
}
