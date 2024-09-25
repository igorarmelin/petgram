import photosGet from '@/actions/photos-get'
import userGet from '@/actions/user-get'
import Feed from '@/components/feed/feed'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Minha Conta',
}

export default async function ContaPage() {
  const { data: user } = await userGet()
  const { data } = await photosGet({ user: user?.username })

  return (
    <section>
      {data?.length ? (
        <Feed photos={data} user={user?.username} />
      ) : (
        <div>
          <p
            style={{ color: '#333', fontSize: '1.25rem', marginBottom: '2rem' }}
          >
            Nenhuma publicação encontrada
          </p>
          <Link
            href={'/conta/postar'}
            className="button"
            style={{ display: 'inline-block' }}
          >
            Publicar foto
          </Link>
        </div>
      )}
    </section>
  )
}
