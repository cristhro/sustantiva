import AuthButton from '@/components/buttons/authButton'
import PageWithAppbar from '@/components/layout/pageWithAppbar'

export default function Home() {
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center">
        <h1>
          abre tu cuenta y<br /> recibe pagos en 1 minuto
        </h1>
        <AuthButton size="lg" />
      </div>
    </PageWithAppbar>
  )
}
