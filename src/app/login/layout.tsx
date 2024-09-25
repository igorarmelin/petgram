import styles from './login.module.css'

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.login}>
      <div className={styles.forms}>{children}</div>
    </div>
  )
}
