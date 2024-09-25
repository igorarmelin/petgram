import statsGet from '@/actions/stats-get'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
const ContaEstatisticas = dynamic(
  () => import('@/components/conta/conta-estatisticas'),
  {
    loading: () => null,
    ssr: false,
  },
)

export const metadata: Metadata = {
  title: 'Estatisticas | Minha Conta',
}

export default async function EstatisticasPage() {
  const { data } = await statsGet()

  if (!data) return null

  return (
    <section>
      <ContaEstatisticas data={data} />
    </section>
  )
}
