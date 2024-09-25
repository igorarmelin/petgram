import LoginResetarForm from '@/components/login/login-resetar-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resetar a senha | Dogs',
  description: 'Resete a sua senha na plataforma Dogs',
}

type ResetarSearchParams = {
  searchParams: {
    key: string
    login: string
  }
}

export default async function ResetarPage({
  searchParams,
}: ResetarSearchParams) {
  return (
    <div className="animeLeft">
      <h1 className="title">Resetar a senha</h1>
      <LoginResetarForm
        keyToken={searchParams.key}
        login={searchParams.login}
      />
    </div>
  )
}
