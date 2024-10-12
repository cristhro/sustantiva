import Image from 'next/image'

export default function Benefits() {
  return (
    <section className="flex w-full justify-center bg-white py-12 md:py-24">
      <div className="container px-8 md:max-w-screen-sm md:px-6 lg:max-w-screen-md xl:max-w-screen-lg">
        <h2 className="mb-12 text-center text-3xl font-bold xl:text-4xl">
          Usamos tu <span className="text-primary">pasaporte Talent</span> para
          calcular tu perfil de riesgo y extenderte una línea de crédito
          instantánea.
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-1">
          <div className="flex flex-col items-center justify-between text-center">
            <div className="flex items-end">
              <Image
                src="/images/human-1.png"
                width={200}
                height={200}
                alt="Connect your passport"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <h3 className="mb-2 text-xl font-semibold">
                Conecta tu pasaporte
              </h3>
              <p className="text-gray-500">
                All paperwork is done online. The whole process is completely
                digital. Just fill in a few details about yourself and hit
                &quot;Get started&quot;.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between text-center">
            <div className="flex items-end">
              <Image
                src="/images/human-2.png"
                width={200}
                height={200}
                alt="Fast process"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <h3 className="mb-2 text-xl font-semibold">Proceso Rápido</h3>
              <p className="text-gray-500">
                The online form usually takes less than 10 minutes to complete.
                So before you even finish your coffee, you could already have
                your request submitted.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between text-center">
            <div className="flex items-end">
              <Image
                src="/images/human-3.png"
                width={200}
                height={200}
                alt="Instant cash"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <h3 className="mb-2 text-xl font-semibold">Lana Instantánea</h3>
              <p className="text-gray-500">
                Once your profile is reviewed, get your offer and accept it.
                You&apos;ll be able to get the funds in your account in
                real-time, and use that money to pay for services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
