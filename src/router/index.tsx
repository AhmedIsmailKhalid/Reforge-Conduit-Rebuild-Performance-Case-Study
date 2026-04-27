import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    lazy: async () => {
      const { default: Component } = await import('@/pages/HomePage')
      return { Component }
    },
  },
  {
    path: ROUTES.LOGIN,
    lazy: async () => {
      const { default: Component } = await import('@/pages/LoginPage')
      return { Component }
    },
  },
  {
    path: ROUTES.REGISTER,
    lazy: async () => {
      const { default: Component } = await import('@/pages/RegisterPage')
      return { Component }
    },
  },
  {
    path: ROUTES.ARTICLE,
    lazy: async () => {
      const { default: Component } = await import('@/pages/ArticlePage')
      return { Component }
    },
  },
  {
    path: ROUTES.EDITOR_NEW,
    lazy: async () => {
      const { default: Component } = await import('@/pages/EditorPage')
      return { Component }
    },
  },
  {
    path: ROUTES.EDITOR_EDIT,
    lazy: async () => {
      const { default: Component } = await import('@/pages/EditorPage')
      return { Component }
    },
  },
  {
    path: ROUTES.PROFILE,
    lazy: async () => {
      const { default: Component } = await import('@/pages/ProfilePage')
      return { Component }
    },
  },
  {
    path: ROUTES.SETTINGS,
    lazy: async () => {
      const { default: Component } = await import('@/pages/SettingsPage')
      return { Component }
    },
  },
  {
    path: '*',
    lazy: async () => {
      const { default: Component } = await import('@/pages/NotFoundPage')
      return { Component }
    },
  },
])