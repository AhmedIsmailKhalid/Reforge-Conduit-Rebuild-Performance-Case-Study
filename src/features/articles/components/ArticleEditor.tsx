import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { articleSchema, type ArticleFormValues } from '../schemas/article.schema'
import { useCreateArticle } from '../hooks/useCreateArticle'
import { useUpdateArticle } from '../hooks/useUpdateArticle'
import type { ApiArticle } from '@/api/types'

interface ArticleEditorProps {
  existingArticle?: ApiArticle
}

export function ArticleEditor({ existingArticle }: ArticleEditorProps) {
  const isEditing = !!existingArticle
  const { mutate: createArticle, isPending: isCreating, error: createError } = useCreateArticle()
  const { mutate: updateArticle, isPending: isUpdating, error: updateError } = useUpdateArticle()
  const isPending = isCreating || isUpdating
  const error = createError ?? updateError

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
  })

  useEffect(() => {
    if (existingArticle) {
      reset({
        title: existingArticle.title,
        description: existingArticle.description,
        body: existingArticle.body,
        tagList: existingArticle.tagList.join(', '),
      })
    }
  }, [existingArticle, reset])

  const onSubmit = (values: ArticleFormValues) => {
    const tagList = values.tagList
      ? values.tagList.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    if (isEditing) {
      updateArticle({
        slug: existingArticle.slug,
        title: values.title,
        description: values.description,
        body: values.body,
        tagList,
      })
    } else {
      createArticle({
        title: values.title,
        description: values.description,
        body: values.body,
        tagList,
      })
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
        {isEditing ? 'Edit article' : 'New article'}
      </h1>

      {error && (
        <div
          role="alert"
          className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
        >
          Failed to {isEditing ? 'update' : 'publish'} article. Please try again.
        </div>
      )}

      <form
        onSubmit={(e) => { void handleSubmit(onSubmit)(e) }}
        noValidate
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            placeholder="Article title"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            {...register('description')}
            placeholder="A short description of the article"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Body
          </label>
          <textarea
            id="body"
            rows={12}
            {...register('body')}
            placeholder="Write your article in markdown..."
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y font-mono text-sm"
          />
          {errors.body && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.body.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="tagList"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Tags
            <span className="ml-1 text-slate-400 font-normal">(comma separated)</span>
          </label>
          <input
            id="tagList"
            type="text"
            {...register('tagList')}
            placeholder="react, typescript, webdev"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isPending
              ? isEditing ? 'Saving...' : 'Publishing...'
              : isEditing ? 'Save changes' : 'Publish article'
            }
          </button>
        </div>
      </form>
    </div>
  )
}