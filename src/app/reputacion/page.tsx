'use client'

import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BuilderScoreChart } from './builder-score-chart'
import { useQuery } from '@tanstack/react-query'
import { fetchTalentPassport } from '@/services/talentProtocolApi'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ExternalLink, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import NoPassportCard from './noPassportCard'
import { CREDIT_ALLOWANCE_BY_SCORE } from '@/lib/constants'

export default function Credito() {
  const [creditAllowed, setCreditAllowed] = useState(0)
  const { address: userAddress } = useAccount()
  const router = useRouter()
  const { data: talentPassportData, status: talentPassportQueryStatus } =
    useQuery({
      queryKey: ['talentPassportKey'],
      queryFn: () => fetchTalentPassport(userAddress as string),
      enabled: Boolean(userAddress),
    })

  function getCreditAllowance(score: number) {
    let creditAllowed = 0

    for (const [key, value] of Object.entries(CREDIT_ALLOWANCE_BY_SCORE)) {
      if (score >= parseInt(key)) {
        creditAllowed = value
      }
    }

    return creditAllowed
  }

  useEffect(() => {
    console.log(talentPassportData)
    if (talentPassportData) {
      const calculatedCreditAllowed = getCreditAllowance(
        talentPassportData.score,
      )
      setCreditAllowed(calculatedCreditAllowed)
    }
  }, [talentPassportData])
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 px-8 text-center">
        {talentPassportQueryStatus === 'pending' && (
          <>
            <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
              <CardContent className="flex flex-col items-center gap-y-4 pt-6">
                <LoaderCircle className="h-16 w-16 animate-spin text-primary" />
                <h4>Calculando tu Reputación Onchain...</h4>
              </CardContent>
            </Card>
          </>
        )}
        {talentPassportQueryStatus === 'success' &&
          (talentPassportData ? (
            <>
              <h2>Tu CrediTalent</h2>

              <div className="flex flex-col gap-y-4">
                <p className="text-2xl">Crédito autorizado:</p>
                <h2>$ {parseFloat(creditAllowed.toString()).toFixed(2)} MXN</h2>
                {creditAllowed > 0 ? (
                  <div className="flex flex-col gap-y-4 py-4">
                    <Link
                      href={{
                        pathname: '/credito',
                        query: { creditAllowed },
                      }}
                    >
                      <Button size="lg">Solicitar Crédito</Button>
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="https://passport.talentprotocol.com/"
                    target="_blank"
                  >
                    <Button size="lg" className="text-xl">
                      Subir Puntaje <ExternalLink className="ml-2 h-6 w-6" />
                    </Button>
                  </Link>
                )}
              </div>
              <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
                <CardHeader className="pb-2">
                  <CardTitle>Talent Passport</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-x-4">
                  <div className="w-full">
                    <BuilderScoreChart
                      builderScore={talentPassportData?.score ?? 0}
                    />
                  </div>
                  <div className="px-6">
                    <ul className="text-left">
                      <li className="text-xl font-semibold">
                        Actividad: {talentPassportData?.activity_score}
                      </li>
                      <li className="text-xl font-semibold">
                        Identidad: {talentPassportData?.identity_score}
                      </li>
                      <li className="text-xl font-semibold">
                        Habilidades: {talentPassportData?.skills_score}
                      </li>
                      <li className="text-xl font-semibold">
                        Humano:{' '}
                        {talentPassportData?.human_checkmark
                          ? 'Sí'
                          : 'No verificado'}
                      </li>
                      {talentPassportData?.last_calculated_at && (
                        <li className="text-xl font-semibold">
                          Última actualización:{' '}
                          {new Date(
                            talentPassportData?.last_calculated_at,
                          ).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long', // full month name
                            day: 'numeric',
                          })}
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <NoPassportCard />
          ))}
        {talentPassportQueryStatus === 'error' && (
          <>
            <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
              <CardContent className="flex gap-x-4">
                <h2 className="text-destructive">Ocurrió un error</h2>

                <Button onClick={() => router.back()}>Regresar</Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </PageWithAppbar>
  )
}
