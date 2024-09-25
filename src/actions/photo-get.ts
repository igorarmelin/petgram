'use server'

import { PHOTO_GET } from '@/functions/api'
import apiError from '@/functions/api-error'
import { Photo } from '@/actions/photos-get'

export type Comment = {
  comment_ID: string
  comment_post_ID: string
  comment_author: string
  comment_content: string
}

export type PhotoData = {
  photo: Photo
  comments: Comment[]
}

export default async function photoGet(id: string) {
  try {
    const { url } = PHOTO_GET(id)
    const response = await fetch(url, {
      method: 'GET',
      next: {
        revalidate: 60,
        tags: ['photos', 'comment'],
      },
    })

    if (!response.ok) throw new Error('Erro ao buscar foto')

    const data = (await response.json()) as PhotoData

    return { data, ok: true, error: '' }
  } catch (error: unknown) {
    return apiError(error)
  }
}
