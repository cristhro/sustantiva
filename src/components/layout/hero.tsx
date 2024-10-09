import Image from 'next/image'
import { Card } from '../ui/card'
import AuthButton from '@/components/buttons/authButton'

export default function Hero() {
  return (
    <section className="w-full bg-inherit py-6 md:py-24 lg:py-12 xl:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="relative h-[80vh] w-full lg:h-auto lg:w-auto">
            <Image
              src="/images/happy-girl.png"
              layout="fill" // Makes the image fill the entire container
              objectFit="contain" // Prevents the image from being cut on any side
              alt="Happy woman in yellow hoodie"
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Prestamos de hasta{' '}
                <span className="text-orange-500">$2,500</span> basado en tu
                reputación
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Conecta tu Talent Passport
              </p>
            </div>
            <Card className="w-full max-w-lg p-6 align-middle">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl text-white">
                    57
                  </div>
                  <div className="mt-2 text-center text-lg text-gray-800">
                    Builder Score
                  </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-800">=</div>
                  <div className="flex flex-col items-center">
                  <div className="text-5xl font-semibold text-orange-500">
                    2,500 $XOC
                  </div>
                  <div className="text-lg text-gray-700">
                    Credito Disponible
                  </div>
                  </div>
                </div>
                <AuthButton />
              </div>
            </Card>
            <div className="flex space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                Seguro y protegido
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                2-3 minutos de procesamiento
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </svg>
                Fondos disponibles al instante
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
