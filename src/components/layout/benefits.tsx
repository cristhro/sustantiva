import Image from 'next/image'

export default function Benefits() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white pl-20">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Usamos tu pasaporte Talent para calcular tu perfil de riesgo y extenderte una línea de crédito instantánea.
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Image
                src="/images/human-1.png"
                width={200}
                height={200}
                alt="Connect your passport"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Conecta tu pasaporte</h3>
            <p className="text-gray-500">
              All paperwork is done online. The whole process is completely digital. Just fill in a few details about yourself and hit &quot;Get started&quot;.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Image
                src="/images/human-2.png"
                width={200}
                height={200}
                alt="Fast process"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Proceso Rápido</h3>
            <p className="text-gray-500">
              The online form usually takes less than 10 minutes to complete. So before you even finish your coffee, you could already have your request submitted.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Image
                src="/images/human-3.png"
                width={200}
                height={200}
                alt="Instant cash"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lana Instantánea</h3>
            <p className="text-gray-500">
              Once your profile is reviewed, get your offer and accept it. You&apos;ll be able to get the funds in your account in real-time!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}