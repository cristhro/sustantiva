'use client'

import { Suspense, useState } from 'react'
import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import CarteraWidget from '@/components/onchain/carteraWidget'
import Prestamo from '@/components/Prestamo'
import SynopsisCredito from '@/components/SynopsisCredito'
import Talent from '@/components/Talent'
import AboutPool from '@/components/AboutPool'
import Ecosistema from '@/components/Ecosistema'

export default function Credito() {
  const [basename, setBasename] = useState('')
  const { user } = useDynamicContext()

  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center">
        <div className="flex w-full flex-col gap-y-4 px-8">
          <h2>Hola {user?.username}</h2>
          {user &&
            user.username &&
            (!basename ? (
              <div className="flex w-full justify-center">
                <Button onClick={() => setBasename(user?.username ?? '')}>
                  {' '}
                  Obtén tu Basename
                </Button>
              </div>
            ) : (
              <CarteraWidget ens={`${basename}.base.eth`} />
            ))}
        </div>
        <div className="grid w-full grid-cols-1 gap-4 px-8 lg:grid-cols-3 xl:mx-8">
          <Suspense>
            <Prestamo />
          </Suspense>
          <SynopsisCredito />
          <Talent />
        </div>
      </div>
      <div className="w-full px-8">
        <AboutPool />
        <Ecosistema />
      </div>
    </PageWithAppbar>
  )
}
