import React, { useState } from 'react'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '../ui/label'
import Link from 'next/link'
import { ArrowUpRightIcon, ExternalLinkIcon, LoaderCircle } from 'lucide-react'

const SendModal = () => {
  const [amount, setAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  const {
    data: hash,
    writeContractAsync: transferXOC,
    isPending: isTransferPending,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const handleTransfer = async (event: React.FormEvent) => {
    event.preventDefault()
    // Ensure amount is valid
    if (!recipientAddress || (amount && !isNaN(Number(amount)))) {
      try {
        // Start the transaction
        const tx = await transferXOC({
          address: '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf',
          abi: [
            // ERC20 ABI
            {
              constant: false,
              inputs: [
                {
                  name: '_to',
                  type: 'address',
                },
                {
                  name: '_value',
                  type: 'uint256',
                },
              ],
              name: 'transfer',
              outputs: [
                {
                  name: '',
                  type: 'bool',
                },
              ],
              type: 'function',
            },
          ],
          functionName: 'transfer',
          args: [recipientAddress, parseEther(amount)],
        })

        console.log('Transfer sent:', tx)
      } catch (error) {
        console.error('Transfer failed:', error)
        alert('Transfer failed. Please try again.')
      }
    } else {
      alert('Please enter a valid amount and recipient address.')
    }
  }

  /*  const { sendTransaction } = useSendTransaction()

  const handleSend = async () => {
    // Ensure amount is valid
    if (!recipientAddress || (amount && !isNaN(Number(amount)))) {
      try {
        // Start the transaction
        const tx = await sendTransaction({
          to: recipientAddress as Address,
          value: parseEther(amount), // Convert the amount to ETH (wei)
        })

        // Optional: Wait for the transaction to be mined
        // await tx.wait()

        console.log('Transaction sent:', tx)
        // Only close the modal if the transaction succeeds
        // onClose() // Uncomment this if you want to close the modal after the transaction is successful
      } catch (error) {
        console.error('Transaction failed:', error)
        alert('Transaction failed. Please try again.')
      }
    } else {
      alert('Please enter a valid amount and recipient address.')
    }
  }
  console.log('amount', amount)
 */
  // if (!isOpen) return null

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button size="icon" className="h-12 w-12 rounded-full">
          <ArrowUpRightIcon className="h-6 w-6" />
          <span className="sr-only">Send</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Enviar MXN</DialogTitle>
          <DialogDescription className="text-left text-lg">
            La cantidad será enviada a la dirección indicada al confirmar la
            transacción
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <form
            className="flex w-full flex-col gap-y-4"
            onSubmit={handleTransfer}
          >
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-lg" htmlFor="address">
                Dirección
              </Label>
              <Input
                name="address"
                placeholder="0xA0Cf…251e"
                required
                onChange={(event) => setRecipientAddress(event.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-lg" htmlFor="value">
                Cantidad
              </Label>
              <div className="relative w-full max-w-sm">
                <Input
                  name="value"
                  placeholder="Cuánto quieres enviar..."
                  required
                  type="number"
                  min={1}
                  step={1}
                  onChange={(event) => setAmount(event.target.value)}
                  className="pr-12" // Add right padding to make room for the currency indicator
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm font-bold text-foreground">
                  MXN
                </span>
              </div>
            </div>
            <div className="flex w-full justify-center pt-4">
              <Button
                className="w-1/2 font-semibold"
                size="lg"
                type="submit"
                disabled={isTransferPending || isConfirming}
              >
                {isTransferPending || isConfirming ? (
                  <span className="flex items-center gap-x-2">
                    Enviando...
                    <LoaderCircle className="h-6 w-6 animate-spin text-white" />
                  </span>
                ) : (
                  'Enviar'
                )}
              </Button>
            </div>
          </form>
          {hash && (
            <div className="flex flex-col items-center pt-4">
              <Link
                className="flex items-center gap-x-1.5 text-lg hover:text-accent"
                href={`https://basescan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en explorador <ExternalLinkIcon className="h4 w-4" />
              </Link>
              {isConfirming && <p className="text-lg">Enviando...</p>}
              {isConfirmed && <p className="text-lg">Transacción enviada</p>}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )

  // return (
  //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
  //     <div className="w-full max-w-md rounded-lg bg-white p-8">
  //       <h2 className="mb-6 text-2xl font-bold">Manda $XOC A Cualquiera</h2>
  //       <div className="mb-6">
  //         <label className="mb-2 block text-sm font-medium">
  //           Dirección del destinatario
  //         </label>
  //         <Input
  //           value={recipientAddress}
  //           onChange={(e) => setRecipientAddress(e.target.value)}
  //           placeholder="0xDireccionDelWallet..."
  //           className="mb-4 block w-full"
  //         />
  //         <label htmlFor="amount" className="mb-2 block text-sm font-medium">
  //           Cantidad a mandar (XOC)
  //         </label>
  //         <Input
  //           id="amount"
  //           type="text"
  //           value={amount}
  //           onChange={(e) => {
  //             const value = e.target.value
  //             if (/^\d*\.?\d*$/.test(value)) {
  //               setAmount(value)
  //             }
  //           }}
  //           placeholder="Introduzca la cantidad (XOC)"
  //           className="mb-4 block w-full"
  //         />
  //       </div>
  //       <div className="flex justify-center space-x-4">
  //         <Button
  //           onClick={onClose}
  //           className="bg-gray-300 text-gray-700 hover:text-white"
  //         >
  //           Cancel
  //         </Button>
  //         <Button
  //           onClick={handleTransfer}
  //           className="bg-gray-300 text-gray-700 hover:text-white"
  //         >
  //           Send
  //         </Button>
  //       </div>
  //       {errorTransfering && (
  //         <div className="mt-4 text-center text-red-500">
  //           Transfer failed. Please try again.
  //         </div>
  //       )}
  //       {succesfulTransfer && (
  //         <div className="mt-4 text-center text-green-500">
  //           Transfer successful!
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )
}

export default SendModal
