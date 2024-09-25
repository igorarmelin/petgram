'use server'

import { STATS_GET } from '@/functions/api'
import apiError from '@/functions/api-error'
import { cookies } from 'next/headers'

export type Stats = {
  id: number
  title: string
  acessos: string
}

export default async function statsGet() {
  try {
    const token = cookies().get('token')?.value

    if (!token) throw new Error('Nenhum token encontrado')

    const { url } = STATS_GET()
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) throw new Error('Erro ao buscar estatísticas')

    const data = (await response.json()) as Stats[]

    return { data, ok: true, error: '' }
  } catch (error: unknown) {
    return apiError(error)
  }
}
