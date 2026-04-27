import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://api.realworld.io/api'

export const handlers = [
  http.get(`${BASE_URL}/tags`, () => {
    return HttpResponse.json({
      tags: ['react', 'typescript', 'javascript', 'vite'],
    })
  }),

  http.get(`${BASE_URL}/articles`, () => {
    return HttpResponse.json({
      articles: [],
      articlesCount: 0,
    })
  }),

  http.post(`${BASE_URL}/users/login`, () => {
    return HttpResponse.json({
      user: {
        email: 'test@test.com',
        token: 'test-token',
        username: 'testuser',
        bio: null,
        image: null,
      },
    })
  }),
]