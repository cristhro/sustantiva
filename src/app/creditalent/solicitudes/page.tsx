'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'
import { LoanApplication, PassportProfile } from '@prisma/client'
import { DenyModalButton } from '@/components/onchain/denyModalButton'
import { ApproveModalButton } from '@/components/onchain/approveModalButton'

interface LoanAppExtended extends LoanApplication {
  creditLine: { totalLimit: number }
  applicant: PassportProfile
}

const mockLoanApplications: LoanAppExtended[] = [
  {
    id: 4,
    applicantId: 4,
    walletId: '0x46b05e5Cc3091553297BfDC143FD035bC04c5de4',
    amount: 1500.5,
    status: 'PENDING',
    xocScore: 0,
    builderScore: 88,
    followers: 3069,
    availableCreditLine: 1500,
    creditLineId: 1,
    nominationsReceived: 51,
    createdAt: new Date('2024-04-14T12:00:00Z'),
    updatedAt: new Date('2024-04-14T13:00:00Z'),
    creditLine: {
      totalLimit: 1500.5,
    },
    reviewedById: null,
    applicant: {
      id: 4,
      walletId: '0x46b05e5Cc3091553297BfDC143FD035bC04c5de4',
      talentPassportId: 456,
      talentUserId: 'user123',
      name: 'Alice',
      profilePictureUrl: 'https://example.com/avatar.png',
      verified: true,
      humanCheck: true,
      score: 85,
      activityScore: 90,
      identityScore: 80,
      skillsScore: 95,
      nominationsReceived: 25,
      socialsLinked: 3,
      followerCount: 500,
      createdAt: new Date('2024-04-10T10:00:00Z'),
      updatedAt: new Date('2024-04-12T11:00:00Z'),
    },
  }
]

const handleApprove = async (loanAplication: LoanAppExtended) => {
  console.log('🚀 ~ handleApprove ~ loanAplication:', loanAplication)
  try {
    // TODO: call to contract approve
  } catch (error) {
    console.error('Error approving address:', error)
  }
}

const handleDeny = async (loanAplication: LoanAppExtended) => {
  console.log('🚀 ~ handleDeny ~ loanAplication:', loanAplication)
  try {
    // TODO: call to contract deny
  } catch (error) {
    console.error('Error denying address:', error)
  }
}

export default function WhiteList() {
  const [loanAplications, setLoanApplications] = useState<LoanAppExtended[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWhitelist = async () => {
      try {
        // TODO: call to API
        setLoanApplications(mockLoanApplications)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching whitelist:', error)
        setIsLoading(false)
      }
    }

    fetchWhitelist()
  }, [])
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 px-8 text-center">
        <h2>Solicitudes</h2>
        {/* Table Structure */}
        {isLoading ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <Table className="w-full border-collapse hover:bg-transparent">
            <TableHeader className="bg-foreground text-white">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-center text-white">Humano</TableHead>
                <TableHead className="text-center text-white">Nombre</TableHead>
                <TableHead className="text-center text-white">
                  Cantidad
                </TableHead>
                <TableHead className="text-center text-white">
                  Crédito
                </TableHead>
                <TableHead className="text-center text-white">
                  Estatus
                </TableHead>
                <TableHead className="text-center text-white">$XOC</TableHead>
                <TableHead className="text-center text-white">
                  Puntuación
                </TableHead>
                <TableHead className="text-center text-white">
                  Nominaciones
                </TableHead>
                <TableHead className="text-center text-white">
                  Seguidores
                </TableHead>
                <TableHead className="text-center text-white">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanAplications.map((item) => (
                <TableRow key={item?.id}>
                  <TableCell className="">
                    {item?.applicant?.humanCheck ? (
                      <p className="text-xl font-bold text-green-700">✅</p>
                    ) : (
                      <p className="text-xl font-bold text-red-700">❌</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-2 py-1 text-left">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      {item?.applicant?.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-left">{`$${item?.amount?.toFixed(2)}`}</TableCell>
                  <TableCell className="text-left">{`$${item?.creditLine?.totalLimit?.toFixed(2)}`}</TableCell>
                  <TableCell className="text-center">{item?.status}</TableCell>
                  <TableCell className="text-center">100 XOC</TableCell>
                  <TableCell className="text-center">
                    {item?.applicant?.score}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.applicant?.nominationsReceived}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.applicant?.followerCount}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <ApproveModalButton loanApplication={item} />
                      <DenyModalButton loanApplication={item} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {/* Back */}
        <Link href="/" className="mt-4">
          <Button>Atrás</Button>
        </Link>
      </div>
    </PageWithAppbar>
  )
}
