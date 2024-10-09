import Benefits from '@/components/layout/benefits'
import HelpNeeded from '@/components/layout/help-needed'
import Hero from '@/components/layout/hero'
import PageWithAppbar from '@/components/layout/pageWithAppbar'
import WhyAsk from '@/components/layout/why-ask'

export default function Home() {
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center">
        <Hero />
        <Benefits />
        <WhyAsk />
        <HelpNeeded />
      </div>
    </PageWithAppbar>
  )
}
