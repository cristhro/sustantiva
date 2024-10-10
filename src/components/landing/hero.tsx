import Image from 'next/image'
import { Card } from '../ui/card'
import AuthButton from '@/components/buttons/authButton'

export default function Hero() {
  return (
    <section className="w-full bg-inherit py-6 md:max-w-screen-sm md:py-24 lg:max-w-screen-md lg:py-8 xl:max-w-screen-lg xl:py-8">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-4 xl:grid-cols-[1fr_600px]">
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
              <h1 className="text-3xl font-bold leading-none tracking-tighter sm:text-5xl xl:text-6xl/none">
                Préstamos de hasta{' '}
                <span className="text-orange-500">$2,500</span> basado en tu
                reputación
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Conecta tu Talent Passport
              </p>
            </div>
            <div className="flex w-full justify-center">
              <Card className="w-full max-w-lg p-6 align-middle">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div className="mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl text-white">
                        57
                      </div>
                      <div className="mt-2 text-center text-lg text-gray-800">
                        Builder Score
                      </div>
                    </div>
                    <div className="mb-8 text-4xl font-bold text-gray-800">
                      =
                    </div>
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
            </div>
            <div className="flex w-full justify-center">
              <div className="flex max-w-lg justify-center px-4 text-sm text-gray-500">
                <div className="flex w-1/3 items-center justify-center gap-x-2 text-left">
                  <svg
                    className="h-8 w-8"
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
                  <span>Seguro y protegido</span>
                </div>
                <div className="flex w-1/3 items-center justify-center gap-x-2 text-left">
                  <svg
                    className="h-12 w-12"
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
                  <span>2-3 minutos de procesamiento</span>
                </div>
                <div className="flex w-1/3 items-center justify-center gap-x-2 text-left">
                  <svg
                    className="h-10 w-10"
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
                  <span>Fondos disponibles al instante</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
