export interface SEOProps {
  title?: string
  description?: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
}

const BASE_URL = 'https://reforge.vercel.app'
const DEFAULT_DESCRIPTION = 'Reforge — a modern blogging platform. Ideas worth sharing, writing worth reading.'
const DEFAULT_IMAGE = `${BASE_URL}/og-default.png`

export function buildMetaTags(props: SEOProps) {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    url = BASE_URL,
    image = DEFAULT_IMAGE,
    type = 'website',
    publishedTime,
    author,
  } = props

  const fullTitle = title ? `${title} — Reforge` : 'Reforge'

  return {
    title: fullTitle,
    description,
    url,
    image,
    type,
    publishedTime,
    author,
  }
}

export function buildArticleJsonLD(props: {
  title: string
  description: string
  author: string
  publishedTime: string
  url: string
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    author: {
      '@type': 'Person',
      name: props.author,
    },
    datePublished: props.publishedTime,
    url: props.url,
    publisher: {
      '@type': 'Organization',
      name: 'Reforge',
      url: BASE_URL,
    },
  })
}