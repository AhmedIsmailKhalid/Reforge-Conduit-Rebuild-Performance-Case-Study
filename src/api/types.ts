// User and Auth
export interface ApiUser {
  email: string
  token: string
  username: string
  bio: string | null
  image: string | null
}

export interface ApiUserResponse {
  user: ApiUser
}

// Profile
export interface ApiProfile {
  username: string
  bio: string | null
  image: string | null
  following: boolean
}

export interface ApiProfileResponse {
  profile: ApiProfile
}

// Article
export interface ApiArticle {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: ApiProfile
}

export interface ApiArticleResponse {
  article: ApiArticle
}

export interface ApiArticlesResponse {
  articles: ApiArticle[]
  articlesCount: number
}

// Comment
export interface ApiComment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: ApiProfile
}

export interface ApiCommentResponse {
  comment: ApiComment
}

export interface ApiCommentsResponse {
  comments: ApiComment[]
}

// Tags
export interface ApiTagsResponse {
  tags: string[]
}

// Errors
export interface ApiErrors {
  errors: Record<string, string[]>
}