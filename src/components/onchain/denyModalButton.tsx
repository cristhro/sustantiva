'use client'

import React, { useState } from 'react'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { LoanApplication, PassportProfile } from '@prisma/client'
import { CreditTalentCenterABI } from '@/components/onchain/abis/CreditTalentCenter'


export function DenyModalButton({ loanApplication }: { loanApplication: LoanApplication }) {
  const [isOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState('')
  const {
    data: hash,
    writeContractAsync: denyApplication,
    isPending: isDenyPending,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const handleDeny = async () => {
    try {
      // Start the transaction
      await denyApplication({
        address: '0x0E44B48406b5E7Bba4E6d089542719Cb2577d444', // Your contract address from the image
        abi: CreditTalentCenterABI,
        functionName: 'rejectCredit', // Function name
        args: [loanApplication.applicant.walletId, loanApplication.applicant.id, reason],
      })
      toast.info('Solicitud de denegación enviada...')
      setIsOpen(false)
    } catch (error) {
      console.error('Deny failed:', error)
      toast.error('Hubo un error al denegar la solicitud, por favor intenta de nuevo')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary hover:bg-primary/60">
          Denegar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[576px] lg:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Denegar Solicitud</DialogTitle>
          <DialogDescription className="text-center text-base">
            ¿Estás seguro que quieres denegar la solicitud de {loanApplication.applicant.name}?
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4"> {/* Use grid for layout */}
          <div>
            <Label htmlFor="reason">Motivo del Rechazo</Label>
            <Input id="reason" value={reason} onChange={e => setReason(e.target.value)} />
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="destructive" onClick={handleDeny} disabled={isDenyPending || isConfirming || !reason}>
              {isDenyPending || isConfirming ? <span>Denegando...</span> : 'Denegar'}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          </div>
        </div>




        {hash && (
          <div className="flex flex-col items-center pt-4">
            <a
               className="flex items-center gap-x-1.5 text-lg hover:text-primary"
               href={`YOUR_BLOCK_EXPLORER_URL/tx/${hash}`} // Replace with your block explorer
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en explorador
            </a>
            {isConfirming && <p>Confirmando...</p>}
            {isConfirmed && <p>Transacción confirmada</p>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}