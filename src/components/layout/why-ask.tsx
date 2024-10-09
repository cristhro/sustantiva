import Image from 'next/image'

export default function WhyAsk() {
  const reasons = [
    'Ir al cine (Chipi Pay)',
    'Comprar una recarga al cel (Chipi Pay)',
    'Comprar una giftcard (Chiply Pay)',
    'Invertir en DeFi (Alux)',
    'Sin procesos complicados',
    'Úsalo para lo que quieras',
  ]

  return (
    <section className="w-full bg-inherit py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Porque pedir prestado?
            </h2>
            <ul className="space-y-2">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-green-500"
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] lg:h-[600px]">
            <Image
              src="/images/human-4.png"
              alt="Man holding cash and smartphone"
              layout="fill"
              objectFit="contain" // Change to contain to prevent cropping
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
