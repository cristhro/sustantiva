import Image from 'next/image'
import { Button } from '../ui/button'

export default function HelpNeeded() {
  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="relative h-[400px] lg:h-[600px]">
            <Image
              src="/images/human-5.png"
              alt="Man in suit pointing"
              layout="fill" // Ensures the image fills the container
              objectFit="contain" // Prevents the image from being cut at the top and bottom
              className="rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Estamos aquí para ayudarte
            </h2>
            <p className="text-gray-500 md:text-lg">
              We know that life is not perfect. But if all it takes is a bit of
              cash to make life just a little easier, Brighter Loans has you
              covered. Need extra funds to finish up a costly renovation?
              We&apos;ve got you covered. Need to take an emergency trip to
              visit a loved one overseas? We&apos;ve got you covered. Need cash
              to pay an expensive hospital bill? We&apos;ve got you covered!
            </p>
            <p className="text-gray-500 md:text-lg">
              Whether night or day, we help you to connect with a lender
              directly. We work around the clock! With a large network of
              lenders, we are sure you will find our service a great solution in
              time of need.
            </p>
            <p className="font-semibold">
              Submit your information to see if you can get a loan up to
              $35,000.
            </p>
            <Button size="lg" className="mt-4">
              Get Started Now →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
