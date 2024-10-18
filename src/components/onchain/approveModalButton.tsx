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
import { LoanApplication } from '@prisma/client' // Correct import
import { CreditTalentCenterABI } from '@/components/onchain/abis/CreditTalentCenter'
import { ERC20ABI } from '@/components/onchain/abis/erc20'
import { parseUnits, parseEther, maxInt256 } from 'viem' // Import parseEther


export function ApproveModalButton({ loanApplication }: { loanApplication: LoanApplication }) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState('')  // Initialize with loan amount

  const {
    data: approveHash,
    writeContractAsync: approveApplication,
    isPending: isApprovePending,
  } = useWriteContract()

  const {
    data: applyToUnderwriteHash,
    writeContractAsync: applyToUnderwriteApplication,
    isPending: isApplyToUnderwritePending,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: approveHash})
  const { isLoading: isApplyToUnderwriteConfirming, isSuccess: isApplyToUnderwriteConfirmed } = useWaitForTransactionReceipt({ hash: applyToUnderwriteHash})

  const handleApprove = async () => {
    const assetAmount = parseFloat(amount) || 0
    const amountInWei = BigInt(assetAmount * 1e18)
    const maxUint256BigNumber = BigInt(maxInt256);
    const ERC20XOC_CONTRACT = '0x4eE906B7135bDBdfC83FE40b8f2156C99FCB64c2'
    const CREDIT_TALENT_CENTER_CONTRACT = '0x0E44B48406b5E7Bba4E6d089542719Cb2577d444'
    const ADMIN_ADDRESS = '0xDb4Ba832c8D47A9bd4eC1d3ce8c07dB471cD5CE2'
    try {

      await applyToUnderwriteApplication({
        address: ERC20XOC_CONTRACT,
        abi: ERC20ABI,
        functionName: 'approve',
        args: [ADMIN_ADDRESS, loanApplication.id, amountInWei, maxUint256BigNumber],
      })

      await approveApplication({
        address: CREDIT_TALENT_CENTER_CONTRACT,
        abi: CreditTalentCenterABI,
        functionName: 'approveCredit',
        args: [ADMIN_ADDRESS, loanApplication.id, amountInWei, maxUint256BigNumber],
      })

      toast.success('Solicitud de aprobación enviada!'); // Success message
      setIsOpen(false)
    } catch (error) {
      console.error('Approve failed:', error)
      toast.error('Hubo un error al aprobar la solicitud. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-secondary hover:bg-secondary/60">
          Aprobar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[576px] lg:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Aprobar Solicitud</DialogTitle> {/* Changed title */}
          <DialogDescription className="text-center text-base">
            ¿Estás seguro que quieres aprobar la solicitud de {loanApplication.applicant?.name}?  {/* Added applicant name */}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          <div>
            <Label htmlFor="amount">Cantidad a Aprobar (ETH)</Label> {/* Clearer label */}
            <Input id="amount" type="number" value={amount} onChange={e => setAmount(+e.target.value)} />
          </div>
          <div className="flex justify-center gap-4">
            <Button className="bg-secondary border-secondary hover:bg-secondary/60" onClick={handleApprove} disabled={isApprovePending || isConfirming || !amount}> {/* Changed variant */}
              {isApprovePending || isConfirming ? <span>Aprobando...</span> : 'Aprobar'} {/* Changed text */}
            </Button>
            <Button variant="outline" className="border-secondary hover:bg-secondary/60" onClick={() => setIsOpen(false)}>Cancelar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}