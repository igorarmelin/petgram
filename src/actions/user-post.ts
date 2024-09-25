'use server'

import { USER_POST } from '@/functions/api'
import apiError from '@/functions/api-error'
import login from './login'

export default async function userPost(state: object, formData: FormData) {
  const username = formData.get('username') as string | null
  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null

  try {
    if (!username || !email || !password)
      throw new Error('Preencha todos os campos')

    if (password.length < 6)
      throw new Error('Senha curta. Digite no minimo 6 caracteres.')

    const { url } = USER_POST()

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Email ou usuário já cadastrado.')

    const { ok } = await login({ ok: true, error: '' }, formData)

    if (!ok) throw new Error('Erro ao logar usuário')

    return { data: null, ok: true, error: '' }
  } catch (error: unknown) {
    return apiError(error)
  }
}
