import { z } from 'zod'

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be at most 255 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(255, 'Description must be at most 255 characters'),
  body: z
    .string()
    .min(1, 'Body is required'),
  tagList: z.string().optional(),
})

export type ArticleFormValues = z.infer<typeof articleSchema>