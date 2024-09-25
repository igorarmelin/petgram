'use client'

import login from '@/actions/login'
import { useFormState, useFormStatus } from 'react-dom'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import ErrorMessage from '../helper/error-message'
import { useEffect } from 'react'
import Link from 'next/link'
import styles from './login-form.module.css'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Enviando...</Button>
      ) : (
        <Button>Entrar</Button>
      )}
    </>
  )
}

export default function LoginForm() {
  const [state, action] = useFormState(login, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state.ok) {
      window.location.href = '/conta'
    }
  }, [state])

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <Link href="/login/perdeu" className={styles.perdeu}>
        Esqueceu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se gratuitamente.</p>
        <Link href="/login/criar" className="button">
          Cadastro
        </Link>
      </div>
    </>
  )
}
