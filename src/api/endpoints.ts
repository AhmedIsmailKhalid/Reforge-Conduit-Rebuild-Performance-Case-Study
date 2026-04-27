export const ENDPOINTS = {
  // Auth
  LOGIN: '/users/login',
  REGISTER: '/users',
  CURRENT_USER: '/user',
  UPDATE_USER: '/user',

  // Articles
  ARTICLES: '/articles',
  ARTICLE: (slug: string) => `/articles/${slug}`,
  FEED: '/articles/feed',

  // Comments
  COMMENTS: (slug: string) => `/articles/${slug}/comments`,
  COMMENT: (slug: string, id: number) => `/articles/${slug}/comments/${id.toString()}`,

  // Favorites
  FAVORITE: (slug: string) => `/articles/${slug}/favorite`,

  // Profiles
  PROFILE: (username: string) => `/profiles/${username}`,
  FOLLOW: (username: string) => `/profiles/${username}/follow`,

  // Tags
  TAGS: '/tags',
} as const