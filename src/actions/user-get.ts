'use server'

import { USER_GET } from '@/functions/api'
import apiError from '@/functions/api-error'
import { cookies } from 'next/headers'

export type User = {
  id: number
  username: string
  nome: string
  email: string
}

export default async function userGet() {
  try {
    const token = cookies().get('token')?.value

    if (!token) throw new Error('Nenhum token encontrado')

    const { url } = USER_GET()

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) throw new Error('Erro ao buscar usuário')

    const data = (await response.json()) as User

    return { data, ok: true, error: '' }
  } catch (error: unknown) {
    return apiError(error)
  }
}
